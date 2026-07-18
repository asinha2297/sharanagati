const fs = require("fs").promises;
const path = require("path");

require("dotenv").config();

const connectDB = require("../config/db");
const Registration = require("../models/Registration");

const filePath = path.join(__dirname, "..", "registrations.json");

const toNumber = (value, fallback = 0) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const normalizeMobile = (mobile) => String(mobile || "").trim();

const toDate = (value, fallback = new Date()) => {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? fallback : date;
};

const parseAdditionalPerson = (value) => {
  if (Array.isArray(value)) {
    return value;
  }

  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  return [];
};

const normalizeRegistration = (entry) => {
  const createdAt = toDate(entry.timestamp || entry.createdAt);

  return {
    name: entry.name || "",
    age: toNumber(entry.age, 0),
    gender: entry.gender || "",
    medicalStudent: entry.medicalStudent === true || entry.medicalStudent === "Yes",
    attendingClasses: entry.attendingClasses || "",
    category: entry.category || "",
    paymentType: entry.paymentType || "advance",
    mobile: normalizeMobile(entry.mobile),
    email: String(entry.email || "").toLowerCase(),
    transactionId: entry.transactionId || "",
    persons: toNumber(entry.persons, 1),
    amountPerPerson: toNumber(entry.amountPerPerson, 0),
    totalAmount: toNumber(entry.totalAmount, 0),
    paidAmount: toNumber(entry.paidAmount, toNumber(entry.totalAmount, 0)),
    fullAmount: toNumber(entry.fullAmount, toNumber(entry.totalAmount, 0)),
    remainingAmount: toNumber(
      entry.remainingAmount,
      Math.max(0, toNumber(entry.fullAmount, 0) - toNumber(entry.paidAmount, 0))
    ),
    paymentStatus:
      entry.paymentStatus ||
      (toNumber(entry.remainingAmount, 0) > 0 ? "pending" : "completed"),
    lateFeeApplied:
      entry.lateFeeApplied === true ||
      entry.lateFeeApplied === "true" ||
      false,
    lateFeeAmount: toNumber(entry.lateFeeAmount, 0),
    additionalPerson: parseAdditionalPerson(entry.additionalPerson),
    paymentScreenshot: entry.paymentScreenshot || "",
    remainingPayment: entry.remainingPayment || undefined,
    razorpayPaymentId: entry.razorpayPaymentId || "",
    razorpayOrderId: entry.razorpayOrderId || "",
    razorpaySignature: entry.razorpaySignature || "",
    paymentVerified: Boolean(entry.paymentVerified),
    rejected: Boolean(entry.rejected),
    token: entry.token || "",
    batch: entry.batch || "",
    regularAttendee: Boolean(entry.regularAttendee),
    createdAt,
    updatedAt: toDate(entry.updatedAt || entry.timestamp || createdAt),
  };
};

const pickLatestByMobile = (registrations) => {
  const byMobile = new Map();

  for (const entry of registrations) {
    const normalizedMobile = normalizeMobile(entry.mobile);

    if (!normalizedMobile) {
      continue;
    }

    const candidate = normalizeRegistration(entry);
    const existing = byMobile.get(normalizedMobile);

    if (!existing) {
      byMobile.set(normalizedMobile, candidate);
      continue;
    }

    const existingTime = existing.createdAt ? existing.createdAt.getTime() : 0;
    const candidateTime = candidate.createdAt ? candidate.createdAt.getTime() : 0;

    if (candidateTime > existingTime) {
      byMobile.set(normalizedMobile, candidate);
    }
  }

  return [...byMobile.values()];
};

const migrate = async () => {
  await connectDB();

  const fileContent = await fs.readFile(filePath, "utf-8");
  const legacyRecords = JSON.parse(fileContent);

  if (!Array.isArray(legacyRecords) || legacyRecords.length === 0) {
    console.log("No legacy registrations found in registrations.json");
    return;
  }

  const uniqueRecords = pickLatestByMobile(legacyRecords);
  const existingMobiles = new Set(
    (await Registration.find({}, { mobile: 1 }).lean()).map((entry) => normalizeMobile(entry.mobile))
  );

  let imported = 0;
  let skipped = 0;

  for (const record of uniqueRecords) {
    if (!record.mobile) {
      skipped += 1;
      continue;
    }

    if (existingMobiles.has(record.mobile)) {
      skipped += 1;
      continue;
    }

    await Registration.create(record);
    imported += 1;
  }

  console.log(`Migration complete. Imported: ${imported}, skipped: ${skipped}`);
};

migrate()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Migration failed:", error);
    process.exit(1);
  });