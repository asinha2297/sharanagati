

const express = require("express"); 
const router = express.Router();
const fs = require("fs").promises;
const path = require("path");

const upload = require("../middlewares/uploadMiddleware"); 
const { registerUser } = require("../controllers/registrationController");

const ACCESS_PASSWORD = process.env.REGISTRATION_ACCESS_PASSWORD || "Sharanagati@2026";

router.post("/register", upload.single("paymentScreenshot"), registerUser);

router.post("/verify-access", (req, res) => {
  const { password } = req.body || {};

  if (!password || password !== ACCESS_PASSWORD) {
    return res.status(401).json({ success: false, message: "Invalid access code" });
  }

  res.status(200).json({ success: true, message: "Access granted" });
});

router.get("/registrations", async (req, res) => {
  const suppliedPassword = req.get("x-registration-password") || req.query.password;

  if (!suppliedPassword || suppliedPassword !== ACCESS_PASSWORD) {
    return res.status(401).json({ success: false, message: "Access denied" });
  }
  try {
    const filePath = path.join(__dirname, "../registrations.json");
    const fileContent = await fs.readFile(filePath, "utf-8");
    const registrations = JSON.parse(fileContent);
    res.status(200).json(Array.isArray(registrations) ? registrations : []);
  } catch (err) {
    console.error("Read registrations error:", err);
    res.status(500).json({ error: err.message });
  }
});

router.post("/save-to-json", upload.single("paymentScreenshot"), async (req, res) => {
  try {
    const data = req.body;
    const filePath = path.join(__dirname, "../registrations.json");

    let existing = [];
    try {
      const fileContent = await fs.readFile(filePath, "utf-8");
      existing = JSON.parse(fileContent);
    } catch (err) {
      existing = [];
    }

    const parsedAdditionalPerson =
      typeof data.additionalPerson === "string"
        ? (() => {
            try {
              return JSON.parse(data.additionalPerson);
            } catch {
              return data.additionalPerson;
            }
          })()
        : data.additionalPerson;

    const registration = {
      ...data,
      additionalPerson: parsedAdditionalPerson,
      paymentScreenshot: req.file
        ? `/uploads/${req.file.filename}`
        : data.paymentScreenshot || "",
      timestamp: new Date().toISOString(),
      id: existing.length + 1,
    };

    existing.push(registration);
    await fs.writeFile(filePath, JSON.stringify(existing, null, 2));

    res.status(200).json({
      message: "Registration saved successfully",
      id: existing.length,
      paymentScreenshot: registration.paymentScreenshot,
    });
  } catch (err) {
    console.error("JSON save error:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;