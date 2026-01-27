const mongoose = require("mongoose");
const validator = require("validator");

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: "please enter a valid email",
    },
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 30 * 60 * 1000,
  },
});

const Otp = mongoose.model("Otp", otpSchema);
module.exports = Otp;
