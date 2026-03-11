const express = require('express');
const paymentController = require('../../controller/payment');
const authController = require('../../controller/auth');
const router = express.Router();

// Protected routes (require authentication)
router.post('/createOrder', authController.auth, paymentController.createOrder);
router.post('/verify', authController.auth, paymentController.paymentVerification);

// Webhook route (NO authentication - Razorpay doesn't send auth tokens)
// IMPORTANT: This must be before express.json() middleware or use raw body middleware
router.post('/webhook', paymentController.handleWebhook);

module.exports = router;
