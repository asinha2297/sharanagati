const mongoose = require("mongoose");

const occultBookingSchema = new mongoose.Schema(
  {
    session: { type: String, required: true, trim: true },
    format: { type: String, required: true, trim: true },
    date: { type: String, required: true, trim: true },
    time: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    focus: { type: String, required: true, trim: true },
    transactionId: { type: String, required: true, trim: true },
    paymentAttachment: { type: String, required: true, trim: true },
    paymentAttachmentPath: { type: String, required: true, trim: true },
    paymentAttachmentUrl: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("OccultBooking", occultBookingSchema);