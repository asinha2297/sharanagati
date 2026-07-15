

const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema( { 
    name: { type: String, required: true, trim: true }, 
    mobile: { type: String, required: true, unique: true }, 
    email: { type: String, required: true, lowercase: true }, 
    gender: { type: String, enum: ["Male", "Female"] }, 
    batch: { type: String }, 
    regularAttendee: Boolean,

paymentScreenshot: String,

paymentVerified: { type: Boolean, default: false },

rejected: { type: Boolean, default: false },

token: String }, { timestamps: true } );

module.exports = mongoose.model("Registration", registrationSchema);