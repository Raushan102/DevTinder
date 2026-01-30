const { Router } = require("express");
const otpController=require('../../controller/otp')
const router = Router();
const otpLimiter = require("../../config/otpRateLimit");

router.post("/send-otp", otpLimiter, otpController.sendOtp);
router.post("/verify-otp", otpController.verifyOtp);

module.exports = router;
