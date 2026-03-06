

const express = require("express"); 
const router = express.Router();

const upload = require("../middlewares/uploadMiddleware"); 
const { registerUser } = require("../controllers/registrationController");

router.post("/register", upload.single("paymentScreenshot"), registerUser);

module.exports = router;