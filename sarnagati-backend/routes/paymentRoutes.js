const express = require("express");
const crypto = require("crypto");
const Razorpay = require("razorpay");
const fs = require("fs").promises;
const path = require("path");

const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const LATE_FEE_CUTOFF = new Date("2026-07-31T23:59:59+05:30");
const LATE_FEE_AMOUNT = 500;

const toNumber = (value, fallback = 0) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const normalizeMobile = (mobile) => String(mobile || "").trim();

const getLatestRegistrationByMobile = (registrations, mobile) => {
  const normalizedMobile = normalizeMobile(mobile);
  const matches = registrations.filter(
    (entry) => normalizeMobile(entry.mobile) === normalizedMobile
  );

  if (!matches.length) {
    return null;
  }

  return matches.sort((a, b) => {
    const aTime = new Date(a.timestamp || 0).getTime();
    const bTime = new Date(b.timestamp || 0).getTime();
    return bTime - aTime;
  })[0];
};

const getPricing = (paymentType) => {
  if (paymentType === "full") {
    return {
      categoryA: 8000,
      categoryB: 7500,
      childDiscount: 5000,
      medicalStudent: 6000,
    };
  }

  return {
    categoryA: 4000,
    categoryB: 3800,
    childDiscount: 2500,
    medicalStudent: 3000,
  };
};

const getBaseAmountForCategory = (category, paymentType) => {
  const pricing = getPricing(paymentType);
  if (category === "A") return pricing.categoryA;
  if (category === "B") return pricing.categoryB;
  return 0;
};

const getAmountsForGroup = (participants, category, paymentType) => {
  const pricing = getPricing(paymentType);
  const baseAmount = getBaseAmountForCategory(category, paymentType);
  let discountedChildUsed = false;

  return participants.map((person) => {
    const numericAge = parseInt(person.age, 10);
    const isMedicalStudent = person.medicalStudent === true || person.medicalStudent === "Yes";

    if (Number.isNaN(numericAge)) return 0;
    if (numericAge < 3) return 0;

    if (isMedicalStudent) {
      return pricing.medicalStudent;
    }

    if (numericAge >= 3 && numericAge <= 17) {
      if (!discountedChildUsed) {
        discountedChildUsed = true;
        return pricing.childDiscount;
      }
      return baseAmount;
    }

    return baseAmount;
  });
};

const calculateRegistrationPayment = (registration) => {
  const participants = Array.isArray(registration?.participants)
    ? registration.participants
    : [];
  const category = registration?.category;
  const paymentType = registration?.paymentType === "full" ? "full" : "advance";

  if (!participants.length || !category) {
    return null;
  }

  const advancePerPerson = getAmountsForGroup(participants, category, "advance");
  const fullPerPerson = getAmountsForGroup(participants, category, "full");
  const selectedPerPerson = paymentType === "full" ? fullPerPerson : advancePerPerson;

  const advanceTotal = advancePerPerson.reduce((total, amount) => total + amount, 0);
  const fullTotal = fullPerPerson.reduce((total, amount) => total + amount, 0);

  const lateFeeApplied = new Date() > LATE_FEE_CUTOFF;
  const lateFeeAmount = lateFeeApplied ? LATE_FEE_AMOUNT : 0;
  const payableNow =
    (paymentType === "full" ? fullTotal : advanceTotal) + lateFeeAmount;
  const fullAmount = fullTotal + lateFeeAmount;
  const remainingAmount = Math.max(0, fullAmount - payableNow);

  return {
    paymentType,
    selectedPerPerson,
    payableNow,
    fullAmount,
    remainingAmount,
    lateFeeApplied,
    lateFeeAmount,
  };
};

router.post("/create-order", async (req, res) => {
  try {
    const { amount, currency = "INR", receipt, orderType, registration, mobile } = req.body || {};
    let amountInPaise = 0;
    let calculated = null;

    if (orderType === "registration") {
      calculated = calculateRegistrationPayment(registration);
      if (!calculated) {
        return res.status(400).json({
          success: false,
          message: "Invalid registration payload for order creation",
        });
      }

      amountInPaise = Math.round(calculated.payableNow * 100);
    } else if (orderType === "remaining") {
      const normalizedMobile = normalizeMobile(mobile);
      if (!normalizedMobile) {
        return res.status(400).json({ success: false, message: "Mobile number is required" });
      }

      const filePath = path.join(__dirname, "../registrations.json");
      let registrations = [];
      try {
        const content = await fs.readFile(filePath, "utf-8");
        registrations = JSON.parse(content);
      } catch {
        registrations = [];
      }

      const latest = getLatestRegistrationByMobile(
        Array.isArray(registrations) ? registrations : [],
        normalizedMobile
      );

      if (!latest) {
        return res.status(404).json({ success: false, message: "No registration found for this mobile" });
      }

      const paidAmount = toNumber(latest.paidAmount, toNumber(latest.totalAmount, 0));
      const fullAmount = toNumber(latest.fullAmount, paidAmount);
      const remainingAmount = Math.max(0, fullAmount - paidAmount);

      if (remainingAmount <= 0) {
        return res.status(400).json({ success: false, message: "No remaining amount to pay" });
      }

      amountInPaise = Math.round(remainingAmount * 100);
      calculated = {
        paidAmount,
        fullAmount,
        remainingAmount,
      };
    } else {
      amountInPaise = Math.round(Number(amount));
    }

    if (!Number.isFinite(amountInPaise) || amountInPaise < 100) {
      return res.status(400).json({
        success: false,
        message: "Amount must be at least 100 paise",
      });
    }

    const order = await razorpay.orders.create({
      amount: amountInPaise,
      currency,
      receipt: receipt || `rcpt_${Date.now()}`,
    });

    return res.status(200).json({
      success: true,
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      calculated,
    });
  } catch (err) {
    const statusCode = err?.statusCode === 401 ? 401 : 500;
    return res.status(statusCode).json({
      success: false,
      message:
        statusCode === 401
          ? "Razorpay authentication failed"
          : "Unable to create Razorpay order",
    });
  }
});

router.post("/verify-payment", (req, res) => {
  const {
    razorpay_order_id: razorpayOrderId,
    razorpay_payment_id: razorpayPaymentId,
    razorpay_signature: razorpaySignature,
  } = req.body || {};

  if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
    return res.status(400).json({
      success: false,
      message: "Missing required payment verification fields",
    });
  }

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpayOrderId}|${razorpayPaymentId}`)
    .digest("hex");

  if (expectedSignature !== razorpaySignature) {
    return res.status(400).json({
      success: false,
      message: "Payment signature mismatch",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Payment verified successfully",
  });
});

module.exports = router;
