const express = require("express");
const JaipurRegistration = require("../models/JaipurRegistration");
const calculateJaipurAmounts = require("../utils/jaipurPricing");
const upload = require("../middlewares/uploadMiddleware");

const router = express.Router();

const normalizeMobile = (mobile) => String(mobile || "").trim();

router.post("/register", upload.single("paymentScreenshot"), async (req, res) => {
  try {
    const mobile = normalizeMobile(req.body?.mobile);
    const email = String(req.body?.email || "").trim().toLowerCase();
    let participants = req.body?.participants;
    if (typeof participants === "string") {
      try {
        participants = JSON.parse(participants);
      } catch {
        return res.status(400).json({ success: false, message: "Invalid devotee details." });
      }
    }
    const paymentReference = String(req.body?.paymentReference || "").trim();

    if (!mobile || !/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ success: false, message: "A valid mobile number and email are required." });
    }

    if (!paymentReference) {
      return res.status(400).json({ success: false, message: "UPI transaction ID or bank reference is required." });
    }

    const amounts = calculateJaipurAmounts({
      roomType: req.body?.roomType,
      paymentType: req.body?.paymentType,
      participants,
    });
    if (!amounts || amounts.paidAmount < 100) {
      return res.status(400).json({ success: false, message: "Please check the Jaipur registration details." });
    }

    const registration = await JaipurRegistration.create({
      mobile,
      email,
      ...amounts,
      persons: amounts.participants.length,
      amountSubmitted: amounts.paidAmount,
      paidAmount: 0,
      remainingAmount: amounts.totalAmount,
      paymentStatus: "pending",
      paymentVerificationStatus: "awaiting_verification",
      paymentReference,
      paymentScreenshot: req.file ? `/uploads/${req.file.filename}` : "",
    });

    return res.status(201).json({
      success: true,
      message: "Jaipur Yatra registration saved successfully.",
      registrationId: registration._id,
      paidAmount: registration.paidAmount,
      remainingAmount: registration.remainingAmount,
      paymentVerificationStatus: registration.paymentVerificationStatus,
    });
  } catch (error) {
    if (error?.code === 11000) {
      return res.status(409).json({ success: false, message: "This mobile number already has a Jaipur Yatra registration." });
    }
    console.error("Jaipur registration save error:", error);
    return res.status(500).json({ success: false, message: "Unable to save Jaipur Yatra registration." });
  }
});

router.get("/status", async (req, res) => {
  try {
    const mobile = normalizeMobile(req.query.mobile);
    if (!mobile) {
      return res.status(400).json({ success: false, message: "Mobile number is required." });
    }
    const registration = await JaipurRegistration.findOne({ mobile }).lean();
    return res.status(200).json({
      success: true,
      requiresRegistration: !registration,
      registered: Boolean(registration),
      registration: registration || null,
    });
  } catch (error) {
    console.error("Jaipur registration lookup error:", error);
    return res.status(500).json({ success: false, message: "Unable to fetch Jaipur registration." });
  }
});

module.exports = router;
