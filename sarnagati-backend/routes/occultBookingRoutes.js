const express = require("express");

const upload = require("../middlewares/uploadMiddleware");
const OccultBooking = require("../models/OccultBooking");

const router = express.Router();

const getPublicBaseUrl = (req) => {
  const envBaseUrl = process.env.PUBLIC_BASE_URL || process.env.APP_BASE_URL || "";

  if (envBaseUrl) {
    return envBaseUrl.replace(/\/$/, "");
  }

  return `${req.protocol}://${req.get("host")}`.replace(/\/$/, "");
};

router.post("/bookings", upload.single("paymentAttachment"), async (req, res) => {
  try {
    const {
      session,
      format,
      name,
      email,
      phone,
      focus,
      transactionId,
    } = req.body || {};

    if (!session || !format || !name || !email || !phone || !focus) {
      return res.status(400).json({
        success: false,
        message: "All booking fields are required",
      });
    }

    if (!transactionId) {
      return res.status(400).json({
        success: false,
        message: "Transaction ID is required",
      });
    }

    if (!req.file?.filename) {
      return res.status(400).json({
        success: false,
        message: "Payment attachment is required",
      });
    }

    const publicBaseUrl = getPublicBaseUrl(req);
    const paymentAttachmentPath = `/uploads/${req.file.filename}`;
    const paymentAttachmentUrl = `${publicBaseUrl}${paymentAttachmentPath}`;

    const booking = await OccultBooking.create({
      session: String(session).trim(),
      format: String(format).trim(),
      name: String(name).trim(),
      email: String(email).trim().toLowerCase(),
      phone: String(phone).trim(),
      focus: String(focus).trim(),
      transactionId: String(transactionId).trim(),
      paymentAttachment: req.file.filename,
      paymentAttachmentPath,
      paymentAttachmentUrl,
    });

    return res.status(201).json({
      success: true,
      message: "Booking request submitted",
      bookingId: booking._id,
      paymentAttachmentUrl,
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "Unable to save booking request",
    });
  }
});

module.exports = router;