const express = require("express");
const JaipurRegistration = require("../models/JaipurRegistration");
const calculateJaipurAmounts = require("../utils/jaipurPricing");
const upload = require("../middlewares/uploadMiddleware");
const { uploadImageToDrive } = require("../services/googleDriveService");

const router = express.Router();
const ADMIN_PASSWORD = process.env.REGISTRATION_ACCESS_PASSWORD || "Prabhupada@1008";

const normalizeMobile = (mobile) => String(mobile || "").trim();
const requireJaipurAdmin = (req, res, next) => {
  const suppliedPassword = req.get("x-registration-password") || "";
  if (suppliedPassword !== ADMIN_PASSWORD) {
    return res.status(401).json({ success: false, message: "Invalid admin access code." });
  }
  return next();
};

router.post("/register", upload.single("paymentScreenshot"), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "Payment screenshot is required." });
    }

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

    const amounts = calculateJaipurAmounts({
      roomType: req.body?.roomType,
      paymentType: req.body?.paymentType,
      participants,
    });
    if (!amounts || amounts.paidAmount < 100) {
      return res.status(400).json({ success: false, message: "Please check the Jaipur registration details." });
    }

    const driveFile = await uploadImageToDrive({
      buffer: req.file.buffer,
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
    });
    const paymentScreenshot = driveFile.webViewLink || `https://drive.google.com/file/d/${driveFile.fileId}/view`;

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
      paymentScreenshot,
      paymentScreenshotDriveFileId: driveFile.fileId,
      paymentScreenshotFileName: driveFile.fileName,
      paymentScreenshotMimeType: driveFile.mimeType,
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
    return next(error);
  }
});

router.get("/status", async (req, res) => {
  try {
    const mobile = normalizeMobile(req.query.mobile);
    if (!mobile) {
      return res.status(400).json({ success: false, message: "Mobile number is required." });
    }
    const registration = await JaipurRegistration.findOne({ mobile })
      .select("mobile paymentType totalAmount amountSubmitted paidAmount remainingAmount paymentStatus paymentVerificationStatus participants.name")
      .lean();
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

router.get("/summary", async (req, res) => {
  try {
    const [summary] = await JaipurRegistration.aggregate([
      {
        $group: {
          _id: null,
          totalRegistrations: { $sum: 1 },
          totalRegisteredPersons: { $sum: "$persons" },
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      totalRegistrations: summary?.totalRegistrations || 0,
      totalRegisteredPersons: summary?.totalRegisteredPersons || 0,
    });
  } catch (error) {
    console.error("Jaipur registration summary error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to fetch Jaipur registration summary.",
    });
  }
});

router.get("/admin/registrations", requireJaipurAdmin, async (req, res) => {
  try {
    const registrations = await JaipurRegistration.find()
      .sort({ createdAt: -1 })
      .lean();
    return res.status(200).json({ success: true, registrations });
  } catch (error) {
    console.error("Jaipur admin list error:", error);
    return res.status(500).json({ success: false, message: "Unable to fetch Jaipur registrations." });
  }
});

router.patch("/admin/registrations/:id/verify", requireJaipurAdmin, async (req, res) => {
  try {
    const registration = await JaipurRegistration.findById(req.params.id);
    if (!registration) {
      return res.status(404).json({ success: false, message: "Jaipur registration not found." });
    }
    if (registration.paymentVerificationStatus === "verified") {
      return res.status(409).json({ success: false, message: "This payment has already been verified." });
    }

    registration.paidAmount = registration.amountSubmitted;
    registration.remainingAmount = Math.max(registration.totalAmount - registration.paidAmount, 0);
    registration.paymentStatus = registration.remainingAmount > 0 ? "pending" : "completed";
    registration.paymentVerificationStatus = "verified";
    registration.paymentVerificationNote = String(req.body?.note || "").trim();
    registration.paymentVerifiedAt = new Date();
    await registration.save();

    return res.status(200).json({ success: true, registration });
  } catch (error) {
    console.error("Jaipur payment verification error:", error);
    return res.status(500).json({ success: false, message: "Unable to verify Jaipur payment." });
  }
});

router.patch("/admin/registrations/:id/reject", requireJaipurAdmin, async (req, res) => {
  try {
    const note = String(req.body?.note || "").trim();
    if (!note) {
      return res.status(400).json({ success: false, message: "A reason is required when rejecting a payment." });
    }

    const registration = await JaipurRegistration.findById(req.params.id);
    if (!registration) {
      return res.status(404).json({ success: false, message: "Jaipur registration not found." });
    }
    if (registration.paymentVerificationStatus === "verified") {
      return res.status(409).json({ success: false, message: "A verified payment cannot be rejected." });
    }

    registration.paymentVerificationStatus = "rejected";
    registration.paymentVerificationNote = note;
    registration.paymentVerifiedAt = null;
    registration.paidAmount = 0;
    registration.remainingAmount = registration.totalAmount;
    registration.paymentStatus = "pending";
    await registration.save();

    return res.status(200).json({ success: true, registration });
  } catch (error) {
    console.error("Jaipur payment rejection error:", error);
    return res.status(500).json({ success: false, message: "Unable to reject Jaipur payment." });
  }
});

module.exports = router;
