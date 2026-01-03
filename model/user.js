const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 50,
    },
    lastName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: [true, "email must be unique"],
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
      enum: {
        values: ["male", "female", "other"],
        message:
          "{VALUE} is not allowed as gender it could only be male , female and other ",
      },
      // validate(value) {
      //   if (!["male", "female", "other"].includes(value)) {
      //     throw new Error(
      //       "please check gender it should be male ,female and other"
      //     );
      //   }
      // },
    },
    age: {
      type: Number,
      min: [18, " min age should be 18 "],
      max: 150,
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

userSchema.index({firstName:1})

// take care it always be simple function because arrow function have lexical this  it does not have there own this
userSchema.methods.getJWTToken = function () {
  const user = this;
  const jwtToken = jwt.sign(
    { _id: user._id },
    "sharda@deviRaushan@2003Augest",
    { expiresIn: "7d" }
  );

  return jwtToken;
};



userSchema.methods.IsPasswordCurrect = async function (userPassword) {
  let user = this;
  const result = await bcrypt.compare(userPassword, user.password);
  return result;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
