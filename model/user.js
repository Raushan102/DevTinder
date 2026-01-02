const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength:4,
      maxLength:50
    },
    lastName: {
      type: String,
      required: true,
      minLength:4,
      maxLength:50
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      validate(value) {
        console.log("validateror run");

        if (!["male", "female", "other"].includes(value)) {
          throw new Error(
            "please check gender it should be male ,female and other"
          );
        }
      },
    },
    age: {
      type: Number,
      min: 18,
      max:150
    },
    photoUrl: {
      type: String,
    },
    about: {
      type: String,
      default: "this is default photo",
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
