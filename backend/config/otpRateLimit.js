const rateLimit = require("express-rate-limit");

const otpLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  limit: 3, // Each IP can only request 3 OTPs every 5 minutes
  message: {
    status: 429,
    message: "Too many OTP requests. Please try again after 5 minutes."
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

module.exports = otpLimiter;
