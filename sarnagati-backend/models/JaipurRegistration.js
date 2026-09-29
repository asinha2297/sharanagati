const mongoose = require("mongoose");

const jaipurParticipantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    age: { type: Number, required: true, min: 0, max: 120 },
    gender: { type: String, enum: ["Male", "Female"], required: true },
    medicalStudent: { type: String, default: "No" },
    attendingClasses: { type: String, enum: ["Yes", "No"], required: true },
    amount: { type: Number, required: true },
    depositAmount: { type: Number, required: true },
  },
  { _id: false }
);

const jaipurRegistrationSchema = new mongoose.Schema(
  {
    mobile: { type: String, required: true, unique: true, index: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    roomType: { type: String, enum: ["double", "triple"], required: true },
    paymentType: { type: String, enum: ["advance", "full"], required: true },
    participants: { type: [jaipurParticipantSchema], required: true },
    persons: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    depositAmount: { type: Number, required: true },
    amountSubmitted: { type: Number, required: true },
    paidAmount: { type: Number, required: true },
    remainingAmount: { type: Number, required: true },
    paymentStatus: { type: String, enum: ["pending", "completed"], required: true },
    paymentVerificationStatus: {
      type: String,
      enum: ["awaiting_verification", "verified", "rejected"],
      default: "awaiting_verification",
    },
    paymentVerifiedAt: Date,
    paymentVerificationNote: { type: String, trim: true, default: "" },
    paymentReference: { type: String, default: "", trim: true },
    paymentScreenshot: String,
    paymentScreenshotDriveFileId: String,
    paymentScreenshotFileName: String,
    paymentScreenshotMimeType: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("JaipurRegistration", jaipurRegistrationSchema);
