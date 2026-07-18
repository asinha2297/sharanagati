
const mongoose = require("mongoose");

const participantSchema = new mongoose.Schema(
    {
        id: Number,
        name: String,
        age: Number,
        gender: String,
        medicalStudent: String,
        attendingClasses: String,
        amount: Number,
    },
    { _id: false }
);

const remainingPaymentSchema = new mongoose.Schema(
    {
        amount: Number,
        razorpayPaymentId: String,
        razorpayOrderId: String,
        razorpaySignature: String,
        paidAt: Date,
    },
    { _id: false }
);

const registrationSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        age: Number,
        gender: { type: String, enum: ["Male", "Female"] },
        medicalStudent: String,
        attendingClasses: String,
        category: String,
        paymentType: String,
        mobile: { type: String, required: true, unique: true, index: true },
        email: { type: String, required: true, lowercase: true },
        transactionId: String,
        persons: Number,
        amountPerPerson: Number,
        totalAmount: Number,
        paidAmount: Number,
        fullAmount: Number,
        remainingAmount: Number,
        paymentStatus: String,
        lateFeeApplied: { type: Boolean, default: false },
        lateFeeAmount: { type: Number, default: 0 },
        additionalPerson: [participantSchema],
        paymentScreenshot: String,
        remainingPayment: remainingPaymentSchema,
        razorpayPaymentId: String,
        razorpayOrderId: String,
        razorpaySignature: String,
        paymentVerified: { type: Boolean, default: false },
        rejected: { type: Boolean, default: false },
        token: String,
        batch: String,
        regularAttendee: Boolean,
    },
    { timestamps: true }
);

module.exports = mongoose.model("Registration", registrationSchema);