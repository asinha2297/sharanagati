

const express = require("express"); const router = express.Router();

const adminController = require("../controllers/adminController");

router.get("/registrations", adminController.getAllRegistrations); 
router.get("/search", adminController.searchByMobile); 
router.put("/verify/:id", adminController.verifyPayment); 
router.put("/reject/:id", adminController.rejectPayment); 
router.get("/export", adminController.exportExcel);

module.exports = router;