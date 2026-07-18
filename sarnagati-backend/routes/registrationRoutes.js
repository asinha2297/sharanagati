

const express = require("express"); 
const router = express.Router();
const fs = require("fs").promises;
const path = require("path");
const crypto = require("crypto");

const upload = require("../middlewares/uploadMiddleware"); 
const { registerUser } = require("../controllers/registrationController");

const ACCESS_PASSWORD = process.env.REGISTRATION_ACCESS_PASSWORD || "Sharanagati@2026";
const LATE_FEE_CUTOFF = new Date("2026-07-31T23:59:59+05:30");
const LATE_FEE_AMOUNT = 500;
const OTP_TTL_MS = 5 * 60 * 1000;
const SESSION_TTL_MS = 30 * 60 * 1000;
const OTP_DELIVERY_MODE = (process.env.OTP_DELIVERY_MODE || "dev").toLowerCase();
const OTP_EXPOSE_IN_RESPONSE =
  process.env.OTP_EXPOSE_IN_RESPONSE === "true" || OTP_DELIVERY_MODE !== "sms";
const otpStore = new Map();
const mobileSessionStore = new Map();

const toNumber = (value, fallback = 0) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const normalizeMobile = (mobile) => String(mobile || "").trim();

const hashOtp = (otp) =>
  crypto.createHash("sha256").update(String(otp)).digest("hex");

const createOtp = () => String(Math.floor(100000 + Math.random() * 900000));

const createSessionToken = () => crypto.randomBytes(24).toString("hex");

const pruneExpiredAuth = () => {
  const now = Date.now();

  for (const [mobile, record] of otpStore.entries()) {
    if (!record || record.expiresAt <= now) {
      otpStore.delete(mobile);
    }
  }

  for (const [token, record] of mobileSessionStore.entries()) {
    if (!record || record.expiresAt <= now) {
      mobileSessionStore.delete(token);
    }
  }
};

const getMobileFromRequest = (req) =>
  normalizeMobile(req.query.mobile || req.body?.mobile || req.params.mobile);

const requireMobileSession = (req, res, next) => {
  pruneExpiredAuth();
  const sessionToken = req.get("x-mobile-session") || "";
  const session = mobileSessionStore.get(sessionToken);

  if (!session || session.expiresAt <= Date.now()) {
    return res.status(401).json({
      success: false,
      message: "Session expired. Please verify OTP again.",
    });
  }

  const requestMobile = getMobileFromRequest(req);
  if (!requestMobile || requestMobile !== session.mobile) {
    return res.status(403).json({
      success: false,
      message: "Mobile verification mismatch",
    });
  }

  req.mobileSession = session;
  return next();
};

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
    if (aTime === bTime) {
      return toNumber(b.id, 0) - toNumber(a.id, 0);
    }
    return bTime - aTime;
  })[0];
};

const mapPaymentSummary = (entry) => {
  const paidAmount = toNumber(entry.paidAmount, toNumber(entry.totalAmount, 0));
  const fullAmount = toNumber(entry.fullAmount, paidAmount);
  const remainingAmount = Math.max(0, fullAmount - paidAmount);

  return {
    paidAmount,
    fullAmount,
    remainingAmount,
    paymentStatus: remainingAmount > 0 ? "pending" : "completed",
    paymentType: entry.paymentType || "full",
    lateFeeApplied: Boolean(entry.lateFeeApplied),
    lateFeeAmount: toNumber(entry.lateFeeAmount, 0),
  };
};

router.post("/register", upload.single("paymentScreenshot"), registerUser);

router.post("/verify-access", (req, res) => {
  const { password } = req.body || {};

  if (!password || password !== ACCESS_PASSWORD) {
    return res.status(401).json({ success: false, message: "Invalid access code" });
  }

  res.status(200).json({ success: true, message: "Access granted" });
});

router.get("/registrations", async (req, res) => {
  const suppliedPassword = req.get("x-registration-password") || req.query.password;

  if (!suppliedPassword || suppliedPassword !== ACCESS_PASSWORD) {
    return res.status(401).json({ success: false, message: "Access denied" });
  }
  try {
    const filePath = path.join(__dirname, "../registrations.json");
    const fileContent = await fs.readFile(filePath, "utf-8");
    const registrations = JSON.parse(fileContent);
    res.status(200).json(Array.isArray(registrations) ? registrations : []);
  } catch (err) {
    console.error("Read registrations error:", err);
    res.status(500).json({ error: err.message });
  }
});

router.post("/request-otp", (req, res) => {
  pruneExpiredAuth();
  const mobile = normalizeMobile(req.body?.mobile);

  if (!mobile) {
    return res.status(400).json({ success: false, message: "Mobile number is required" });
  }

  const otp = createOtp();
  otpStore.set(mobile, {
    otpHash: hashOtp(otp),
    expiresAt: Date.now() + OTP_TTL_MS,
  });

  const response = {
    success: true,
    message:
      OTP_DELIVERY_MODE === "sms"
        ? "OTP sent to your mobile number. Please verify to continue."
        : "OTP generated in app (SMS not configured). Please verify to continue.",
  };

  // Fallback helper until SMS integration is configured.
  if (OTP_EXPOSE_IN_RESPONSE) {
    response.devOtp = otp;
  }

  if (OTP_DELIVERY_MODE === "sms") {
    console.warn("OTP_DELIVERY_MODE=sms but SMS provider integration is not configured yet.");
  }

  return res.status(200).json(response);
});

router.post("/verify-otp", (req, res) => {
  pruneExpiredAuth();
  const mobile = normalizeMobile(req.body?.mobile);
  const otp = String(req.body?.otp || "").trim();

  if (!mobile || !otp) {
    return res.status(400).json({ success: false, message: "Mobile and OTP are required" });
  }

  const otpRecord = otpStore.get(mobile);
  if (!otpRecord || otpRecord.expiresAt <= Date.now()) {
    otpStore.delete(mobile);
    return res.status(401).json({ success: false, message: "OTP expired. Request a new OTP." });
  }

  if (hashOtp(otp) !== otpRecord.otpHash) {
    return res.status(401).json({ success: false, message: "Invalid OTP" });
  }

  otpStore.delete(mobile);
  const sessionToken = createSessionToken();
  mobileSessionStore.set(sessionToken, {
    mobile,
    expiresAt: Date.now() + SESSION_TTL_MS,
  });

  return res.status(200).json({
    success: true,
    message: "OTP verified",
    mobileSessionToken: sessionToken,
    expiresInSeconds: Math.floor(SESSION_TTL_MS / 1000),
  });
});

router.get("/pending-dues", async (req, res) => {
  const suppliedPassword = req.get("x-registration-password") || req.query.password;

  if (!suppliedPassword || suppliedPassword !== ACCESS_PASSWORD) {
    return res.status(401).json({ success: false, message: "Access denied" });
  }

  try {
    const filePath = path.join(__dirname, "../registrations.json");
    let registrations = [];

    try {
      const fileContent = await fs.readFile(filePath, "utf-8");
      registrations = JSON.parse(fileContent);
    } catch {
      registrations = [];
    }

    const pending = (Array.isArray(registrations) ? registrations : [])
      .map((entry) => {
        const payment = mapPaymentSummary(entry);
        return {
          id: entry.id,
          name: entry.name,
          mobile: entry.mobile,
          category: entry.category,
          persons: entry.persons,
          paymentType: payment.paymentType,
          paidAmount: payment.paidAmount,
          fullAmount: payment.fullAmount,
          remainingAmount: payment.remainingAmount,
          lateFeeApplied: payment.lateFeeApplied,
          lateFeeAmount: payment.lateFeeAmount,
          timestamp: entry.timestamp,
        };
      })
      .filter((entry) => entry.remainingAmount > 0)
      .sort((a, b) => b.remainingAmount - a.remainingAmount);

    return res.status(200).json({
      success: true,
      count: pending.length,
      totalRemaining: pending.reduce((sum, item) => sum + item.remainingAmount, 0),
      dues: pending,
    });
  } catch (err) {
    console.error("Pending dues report error:", err);
    return res.status(500).json({ success: false, message: "Unable to fetch pending dues" });
  }
});

router.get("/status", async (req, res) => {
  try {
    const mobile = normalizeMobile(req.query.mobile);

    if (!mobile) {
      return res.status(400).json({
        success: false,
        message: "Mobile number is required",
      });
    }

    const filePath = path.join(__dirname, "../registrations.json");
    let registrations = [];

    try {
      const fileContent = await fs.readFile(filePath, "utf-8");
      registrations = JSON.parse(fileContent);
    } catch {
      registrations = [];
    }

    const latest = getLatestRegistrationByMobile(
      Array.isArray(registrations) ? registrations : [],
      mobile
    );

    if (!latest) {
      return res.status(200).json({
        success: true,
        requiresRegistration: true,
      });
    }

    const payment = mapPaymentSummary(latest);

    return res.status(200).json({
      success: true,
      requiresRegistration: false,
      registration: {
        id: latest.id,
        name: latest.name,
        mobile: latest.mobile,
        category: latest.category,
        persons: latest.persons,
        ...payment,
      },
    });
  } catch (err) {
    console.error("Registration status lookup error:", err);
    return res.status(500).json({ success: false, message: "Unable to fetch status" });
  }
});

router.post("/complete-payment", async (req, res) => {
  try {
    const { mobile, amountPaid, razorpayPaymentId, razorpayOrderId, razorpaySignature } = req.body || {};
    const normalizedMobile = normalizeMobile(mobile);

    if (!normalizedMobile) {
      return res.status(400).json({ success: false, message: "Mobile number is required" });
    }

    const paidDelta = toNumber(amountPaid, 0);
    if (paidDelta <= 0) {
      return res.status(400).json({ success: false, message: "Invalid payment amount" });
    }

    const filePath = path.join(__dirname, "../registrations.json");
    let registrations = [];

    try {
      const fileContent = await fs.readFile(filePath, "utf-8");
      registrations = JSON.parse(fileContent);
    } catch {
      registrations = [];
    }

    if (!Array.isArray(registrations) || registrations.length === 0) {
      return res.status(404).json({ success: false, message: "No registrations found" });
    }

    const latest = getLatestRegistrationByMobile(registrations, normalizedMobile);
    if (!latest) {
      return res.status(404).json({ success: false, message: "No registration found for this mobile" });
    }

    const latestIndex = registrations.findIndex((entry) => entry.id === latest.id);
    if (latestIndex === -1) {
      return res.status(404).json({ success: false, message: "Registration record missing" });
    }

    const payment = mapPaymentSummary(latest);
    if (payment.remainingAmount <= 0) {
      return res.status(400).json({ success: false, message: "No remaining amount to pay" });
    }

    if (Math.abs(payment.remainingAmount - paidDelta) > 1) {
      return res.status(400).json({
        success: false,
        message: "Paid amount must match remaining amount",
        remainingAmount: payment.remainingAmount,
      });
    }

    const updatedPaidAmount = payment.paidAmount + paidDelta;
    const updatedRemaining = Math.max(0, payment.fullAmount - updatedPaidAmount);

    registrations[latestIndex] = {
      ...latest,
      paidAmount: updatedPaidAmount,
      fullAmount: payment.fullAmount,
      remainingAmount: updatedRemaining,
      paymentStatus: updatedRemaining > 0 ? "pending" : "completed",
      remainingPayment: {
        amount: paidDelta,
        razorpayPaymentId: razorpayPaymentId || "",
        razorpayOrderId: razorpayOrderId || "",
        razorpaySignature: razorpaySignature || "",
        paidAt: new Date().toISOString(),
      },
      updatedAt: new Date().toISOString(),
    };

    await fs.writeFile(filePath, JSON.stringify(registrations, null, 2));

    return res.status(200).json({
      success: true,
      message: "Remaining payment recorded successfully",
      paidAmount: updatedPaidAmount,
      remainingAmount: updatedRemaining,
      paymentStatus: updatedRemaining > 0 ? "pending" : "completed",
    });
  } catch (err) {
    console.error("Complete payment error:", err);
    return res.status(500).json({ success: false, message: "Unable to update payment" });
  }
});

router.post("/save-to-json", upload.single("paymentScreenshot"), async (req, res) => {
  try {
    const data = req.body;
    const filePath = path.join(__dirname, "../registrations.json");

    let existing = [];
    try {
      const fileContent = await fs.readFile(filePath, "utf-8");
      existing = JSON.parse(fileContent);
    } catch (err) {
      existing = [];
    }

    const parsedAdditionalPerson =
      typeof data.additionalPerson === "string"
        ? (() => {
            try {
              return JSON.parse(data.additionalPerson);
            } catch {
              return data.additionalPerson;
            }
          })()
        : data.additionalPerson;

    const registration = {
      ...data,
      additionalPerson: parsedAdditionalPerson,
      paidAmount: toNumber(data.paidAmount, toNumber(data.totalAmount, 0)),
      fullAmount: toNumber(data.fullAmount, toNumber(data.totalAmount, 0)),
      paymentStatus: data.paymentStatus || "completed",
      lateFeeApplied:
        data.lateFeeApplied === "true" ||
        data.lateFeeApplied === true ||
        new Date() > LATE_FEE_CUTOFF,
      lateFeeAmount: toNumber(
        data.lateFeeAmount,
        new Date() > LATE_FEE_CUTOFF ? LATE_FEE_AMOUNT : 0
      ),
      paymentScreenshot: req.file
        ? `/uploads/${req.file.filename}`
        : data.paymentScreenshot || "",
      timestamp: new Date().toISOString(),
      id: existing.length + 1,
    };

    existing.push(registration);
    await fs.writeFile(filePath, JSON.stringify(existing, null, 2));

    res.status(200).json({
      message: "Registration saved successfully",
      id: existing.length,
      paymentScreenshot: registration.paymentScreenshot,
    });
  } catch (err) {
    console.error("JSON save error:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;