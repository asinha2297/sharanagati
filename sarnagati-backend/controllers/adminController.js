
const Registration = require("../models/Registration"); const XLSX = require("xlsx"); const asyncHandler = require("../middlewares/asyncHandler");

exports.getAllRegistrations = asyncHandler(async (req, res) => { const data = await Registration.find().sort({ createdAt: -1 }); res.json(data); });

exports.searchByMobile = asyncHandler(async (req, res) => { const { mobile } = req.query;

const data = await Registration.find({
  mobile: { $regex: `^${mobile}` }
});

res.json(data); });

exports.verifyPayment = asyncHandler(async (req, res) => { const { id } = req.params;

const user = await Registration.findByIdAndUpdate( id, { paymentVerified: true }, { new: true } );

res.json({ message: "Payment Verified", user }); });

exports.rejectPayment = asyncHandler(async (req, res) => { const { id } = req.params;

const user = await Registration.findByIdAndUpdate( id, { rejected: true, paymentVerified: false }, { new: true } );

res.json({ message: "Payment Rejected", user }); });

exports.exportExcel = asyncHandler(async (req, res) => { const users = await Registration.find();

const data = users.map((u) => ({ Name: u.name, Mobile: u.mobile, Email: u.email, Batch: u.batch, Gender: u.gender, Verified: u.paymentVerified, Token: u.token }));

const worksheet = XLSX.utils.json_to_sheet(data); const workbook = XLSX.utils.book_new();

XLSX.utils.book_append_sheet(workbook, worksheet, "Registrations");

const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

res.setHeader( "Content-Disposition", "attachment; filename=registrations.xlsx" );

res.send(buffer); });