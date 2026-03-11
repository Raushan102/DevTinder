const crypto = require("crypto");
const razorpayInstance = require("../config/razorpay");
const Payment = require("../model/payment");
const User = require("../model/user");
const sendEmail = require("../config/sendEmail");
const { paymentPlanAmount, paymentPlanDuration } = require("../src/util/constent");

exports.createOrder = async (req, res) => {
  const { membershipType } = req.body;
  console.log(paymentPlanAmount, "and", membershipType);
  console.log("this is the amount ", paymentPlanAmount[membershipType] * 100);

  try {
    // Create Razorpay order
    const orderData = {
      amount: paymentPlanAmount[membershipType] * 100, // Amount in paise
      currency: "INR",
      receipt: `order_rcptid_${Date.now()}`, // Make receipt unique
      notes: {
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        membershipType: membershipType,
      },
    };

    const order = await razorpayInstance.orders.create(orderData);

    const orderDetail = {
      userId: req.user._id,
      orderId: order.id,
      notes: {
        firstName: req.user.firstName,
        lastName: req.user.lastName,
      },
      membershipType: order.notes.membershipType,
      amount: order.amount,
      currency: order.currency,
      status: order.status,
      startDate: Date.now(),
      receipt: order.receipt,
    };

    const payment = new Payment(orderDetail);
    const response = await payment.save();

    console.log(order);

    res.status(200).json({
      ...response.toJSON(),
      keyId: process.env.RAZORPAY_KEY_ID, // Fixed typo
      email: req.user.email,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({
      error: "Failed to create order",
      message: error.message,
    });
  }
};

/**
 * Payment verification from frontend after successful payment
 */
exports.paymentVerification = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    // Validate required fields
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        error: "Missing required payment verification fields",
      });
    }

    // Create the expected signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    // Compare signatures
    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // Payment is verified, update database
      const payment = await Payment.findOneAndUpdate(
        { orderId: razorpay_order_id },
        {
          paymentId: razorpay_payment_id,
          signature: razorpay_signature,
          status: "successful",
          paymentMethod: "online", // we can update this based on actual method from webhook
        },
        { new: true },
      );

      if (!payment) {
        return res.status(404).json({
          success: false,
          error: "Payment record not found",
        });
      }

      console.log("Payment verified successfully:", payment);

      const planDuration = paymentPlanDuration[payment.membershipType];
      const endDate = new Date(payment.startDate);
      endDate.setDate(endDate.getDate() + planDuration);

      await Payment.findOneAndUpdate(
        { orderId: razorpay_order_id },
        {
          paymentId: razorpay_payment_id,
          signature: razorpay_signature,
          status: "successful",
          paymentMethod: "online",
          startDate: payment.startDate,
          endDate: endDate,
        },
        { new: true },
      );

      // ✅ Update the user's premium status
      await User.findByIdAndUpdate(payment.userId, {
        isPremium: true,
        membershipType: payment.membershipType,
        premiumEndDate: endDate,
      });

      // ✅ Send success email
      try {
        const subject = "Welcome to DevTinder Premium!";
        const textBody = `Hello ${req.user.firstName}! Your ${payment.membershipType} premium membership has been successfully activated. Order ID: ${razorpay_order_id}. Enjoy your new elite features!`;
        const htmlBody = `
          <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
            <h1 style="color: #fb923c;">Welcome to DevTinder Premium!</h1>
            <p>Hello <strong>${req.user.firstName}</strong>,</p>
            <p>Your <strong>${payment.membershipType}</strong> membership has been successfully activated.</p>
            <ul>
              <li><strong>Order ID:</strong> ${razorpay_order_id}</li>
              <li><strong>Payment ID:</strong> ${razorpay_payment_id}</li>
              <li><strong>Valid Until:</strong> ${endDate.toDateString()}</li>
            </ul>
            <p>Enjoy your exclusive features!</p>
            <p>Best,<br/>The DevTinder Team</p>
          </div>
        `;

        // In SES Sandbox, fromAddress must be verified. Using an env variable or falling back to the user's email for testing.
        const senderEmail = "auth@raushankumarsaw.in";

        await sendEmail(
          req.user.email,
          senderEmail,
          subject,
          htmlBody,
          textBody,
        );
        console.log("Premium success email sent to", req.user.email);
      } catch (emailError) {
        console.error("Failed to send premium success email:", emailError);
      }

      res.status(200).json({
        success: true,
        message: "Payment verified successfully",
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
      });
    } else {
      // Signature verification failed
      await Payment.findOneAndUpdate(
        { orderId: razorpay_order_id },
        {
          paymentId: razorpay_payment_id,
          status: "failed",
        },
      );

      res.status(400).json({
        success: false,
        error: "Payment verification failed - Invalid signature",
      });
    }
  } catch (error) {
    console.error("Payment verification error:", error);
    res.status(500).json({
      success: false,
      error: "Payment verification failed",
      message: error.message,
    });
  }
};

/**
 * Webhook handler for Razorpay events
 * IMPORTANT: This receives raw body for signature validation
 */
exports.handleWebhook = async (req, res) => {
  try {
    // Get the signature from header
    const signature = req.headers["x-razorpay-signature"];

    if (!signature) {
      console.error("Missing signature header");
      return res.status(400).json({ error: "Missing signature header" });
    }

    // CRITICAL: Use rawBody for signature validation
    // rawBody is set by middleware
    const webhookBody = req.rawBody || JSON.stringify(req.body);

    // Your webhook secret from Razorpay dashboard
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

    if (!webhookSecret) {
      console.error("RAZORPAY_WEBHOOK_SECRET not configured");
      return res.status(500).json({ error: "Webhook secret not configured" });
    }

    // Validate the signature
    const expectedSignature = crypto
      .createHmac("sha256", webhookSecret)
      .update(webhookBody)
      .digest("hex");

    const isValid = expectedSignature === signature;

    if (!isValid) {
      console.error("Invalid webhook signature");
      console.error("Expected:", expectedSignature);
      console.error("Received:", signature);
      return res.status(400).json({ error: "Invalid signature" });
    }

    // Signature is valid, process the event
    const event = req.body.event;
    const payload = req.body.payload;

    console.log(`✅ Webhook event received: ${event}`);

    // Handle different webhook events
    switch (event) {
      case "payment.authorized":
        await handlePaymentAuthorized(payload.payment.entity);
        break;

      case "payment.captured":
        await handlePaymentCaptured(payload.payment.entity);
        break;

      case "payment.failed":
        await handlePaymentFailed(payload.payment.entity);
        break;

      case "order.paid":
        await handleOrderPaid(payload.order.entity, payload.payment.entity);
        break;

      default:
        console.log(`Unhandled event type: ${event}`);
    }

    // Always return 200 to acknowledge receipt
    res.status(200).json({ status: "ok" });
  } catch (error) {
    console.error("Webhook processing error:", error);
    // Still return 200 to prevent Razorpay from retrying
    res.status(200).json({ status: "error", message: error.message });
  }
};

// Helper functions for webhook events
const handlePaymentAuthorized = async (payment) => {
  try {
    await Payment.findOneAndUpdate(
      { orderId: payment.order_id },
      {
        paymentId: payment.id,
        status: "pending",
        paymentMethod: payment.method,
      },
    );
    console.log(`💳 Payment authorized: ${payment.id}`);
  } catch (error) {
    console.error("Error handling payment.authorized:", error);
  }
};

const handlePaymentCaptured = async (payment) => {
  try {
    const updatedPayment = await Payment.findOneAndUpdate(
      { orderId: payment.order_id },
      {
        paymentId: payment.id,
        status: "successful",
        paymentMethod: payment.method,
      },
      { new: true },
    );

    if (updatedPayment) {
      console.log(`✅ Payment captured successfully: ${payment.id}`);

      const planDuration =
        paymentPlanDuration[updatedPayment.membershipType] || 0;
      const endDate = new Date(updatedPayment.startDate || Date.now());
      endDate.setDate(endDate.getDate() + planDuration);

      // Update the user's premium status in webhook
      await User.findByIdAndUpdate(updatedPayment.userId, {
        isPremium: true,
        membershipType: updatedPayment.membershipType,
        premiumEndDate: endDate,
      });
    }
  } catch (error) {
    console.error("Error handling payment.captured:", error);
  }
};

const handlePaymentFailed = async (payment) => {
  try {
    await Payment.findOneAndUpdate(
      { orderId: payment.order_id },
      {
        paymentId: payment.id,
        status: "failed",
      },
    );
    console.log(`❌ Payment failed: ${payment.id}`);
  } catch (error) {
    console.error("Error handling payment.failed:", error);
  }
};

const handleOrderPaid = async (order, payment) => {
  try {
    await Payment.findOneAndUpdate(
      { orderId: order.id },
      {
        paymentId: payment.id,
        status: "successful",
        paymentMethod: payment.method,
      },
    );
    console.log(`✅ Order paid: ${order.id}`);
  } catch (error) {
    console.error("Error handling order.paid:", error);
  }
};
