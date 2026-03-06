
const Registration = require("../models/Registration"); const generateToken = require("../utils/generateToken"); const asyncHandler = require("../middlewares/asyncHandler"); const AppError = require("../utils/AppError");

exports.registerUser = asyncHandler(async (req, res, next) => { const { name, mobile, email, gender, batch, regularAttendee } = req.body;

if (!req.file) { return next(new AppError("Payment screenshot required", 400)); }

const existing = await Registration.findOne({ mobile });

if (existing) { return next(new AppError("User already registered", 409)); }

const token = generateToken();

const registration = await Registration.create({ name, mobile, email, gender, batch, regularAttendee, paymentScreenshot: req.file.filename, token });

res.status(201).json({ success: true, message: "Registration successful", token: registration.token }); });