const express = require("express");

const upload = require("../middlewares/uploadMiddleware");
const OccultBooking = require("../models/OccultBooking");

const router = express.Router();

router.post("/bookings", upload.single("paymentAttachment"), async (req, res) => {
  try {
    const {
      session,
      format,
      date,
      time,
      name,
      email,
      phone,
      focus,
      transactionId,
    } = req.body || {};

    if (!session || !format || !date || !time || !name || !email || !phone || !focus) {
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

    const booking = await OccultBooking.create({
      session: String(session).trim(),
      format: String(format).trim(),
      date: String(date).trim(),
      time: String(time).trim(),
      name: String(name).trim(),
      email: String(email).trim().toLowerCase(),
      phone: String(phone).trim(),
      focus: String(focus).trim(),
      transactionId: String(transactionId).trim(),
      paymentAttachment: req.file.filename,
    });

    return res.status(201).json({
      success: true,
      message: "Booking request submitted",
      bookingId: booking._id,
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "Unable to save booking request",
    });
  }
});

module.exports = router;