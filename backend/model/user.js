const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 50,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 50,
      trim: true,
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
        message: "{VALUE} is not allowed as gender (only male, female, other)",
      },
    },
    age: {
      type: Number,
      min: [18, "Minimum age should be 18"],
      max: 150,
    },
    photoUrl: {
      type: String,
      default:
        "https://i.pinimg.com/736x/a6/49/e2/a649e2cd302fec12ba027249058ee420.jpg",
    },
    photoPublicId: {
      type: String,
      default: null,
    },
    // Short catchy tagline – shows prominently
    headline: {
      type: String,
      maxlength: [120, "Headline cannot exceed 120 characters"],
      trim: true,
      default: "Just here to meet interesting people 😊",
    },
    // Longer bio / about me section
    about: {
      type: String,
      maxlength: [600, "About section cannot exceed 600 characters"],
      trim: true,
      default: "No about section yet... tell people who you are!",
    },
    profession: {
      type: String,
      maxlength: [80, "Profession cannot exceed 80 characters"],
      trim: true,
      default: "Exploring life",
    },
    skills: {
      type: [String],
      default: [],
    },
    // ✅ NEW: Social Media Links
    socialMedia: {
      github: {
        type: String,
        trim: true,
        default: "",
        validate: {
          validator: function (v) {
            if (!v) return true; // Allow empty
            return /^https?:\/\/(www\.)?github\.com\/[\w-]+\/?$/.test(v);
          },
          message: "Please provide a valid GitHub URL",
        },
      },
      linkedin: {
        type: String,
        trim: true,
        default: "",
        validate: {
          validator: function (v) {
            if (!v) return true; // Allow empty
            return /^https?:\/\/(www\.)?linkedin\.com\/in\/[\w-]+\/?$/.test(v);
          },
          message: "Please provide a valid LinkedIn URL",
        },
      },
      twitter: {
        type: String,
        trim: true,
        default: "",
        validate: {
          validator: function (v) {
            if (!v) return true; // Allow empty
            return /^https?:\/\/(www\.)?(twitter\.com|x\.com)\/[\w]+\/?$/.test(
              v,
            );
          },
          message: "Please provide a valid Twitter/X URL",
        },
      },
    },
    connections: {
      type: [
        {
          type: mongoose.Types.ObjectId,
          ref: "User",
        },
      ],
    },
  },
  {
    timestamps: true,
  },
);

userSchema.index({ firstName: 1 });

// JWT method
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// Password check method
userSchema.methods.IsPasswordCurrect = async function (userPassword) {
  return await bcrypt.compare(userPassword, this.password);
};
userSchema.statics.getAllowedUpdateFields = function () {
  return [
    "firstName",
    "lastName",
    "age",
    "gender",
    "photoUrl",
    "headline",
    "profession",
    "about",
    "skills",
    "socialMedia", // ✅ NEW
  ];
};

const User = mongoose.model("User", userSchema);
module.exports = User;
