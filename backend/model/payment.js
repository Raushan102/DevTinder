const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderId: {
      type: String,
      required: true,
  
    },
    paymentId: {
      type: String,
      default: null,
    },
    signature: {
      type: String,
      default: null,
    },
    notes: {
      firstName: { type: String, default: null },
      lastName: { type: String, default: null },

    },
    membershipType: {
      type: String,
      enum: ["Bronze", "Silver", "Gold"],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min:1,
      max:10000
    },
    currency: {
      type: String,
      default: "INR",
    },
    status: {
      type: String,
      required: true,
      enum: ["created", "pending", "successful", "failed"],
      default: "created",
    },
    paymentMethod: {
      type: String,
      default: null,
    },
    startDate: {
      type: Date,
      default: null,
    },
    endDate: {
      type: Date,
      default: null,
    },
    receipt: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);


paymentSchema.index({ orderId: 1 });

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
