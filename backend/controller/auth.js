const bcrypt = require("bcrypt");
const User = require("../model/user");
const jwt = require("jsonwebtoken");

// login
exports.login = async (req, res) => {
  try {
    if (!req.body.email) {
      return res.status(400).json({
        status: 400,
        message: "unable to read email",
      });
    }
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json({
        status: 400,
        message: "invalid credentials",
      });
    }

    const result = await user.IsPasswordCurrect(req.body.password);

    if (result) {
      const token = await user.getJWTToken();
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.status(200).json({
        message: "login successfully",
        status: 200,
        data: user,
      });
    } else {
      return res.status(404).json({
        status: 404,
        message: "invalid credentials",
      });
    }
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
};

//signup
exports.signUp = async (req, res) => {
  const { firstName, lastName, email, password, gender } = req.body;
  const hasPassword = await bcrypt.hash(password, 10);

  try {
    await new User({
      firstName,
      lastName,
      email,
      password: hasPassword,
      gender,
    }).save();
    res.status(200).json({
      status: 200,
      message: "signup successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error.message,
    });
  }
};

exports.logout = async (req, res) => {
  console.log('logout request come');

  res
    .cookie("token", null, { expires: new Date(Date.now()) })
    .status(200)
    .json({ status: 200, message: "logout successfully" });
};

exports.auth = async (req, res, next) => {
  try {
    const { token } = req?.cookies;

    if (!token) {
      return res.status(401).json({
        status: 401,
        message: "unauthorized please login",
      });
    }
    const { _id } = await jwt.verify(token, "sharda@deviRaushan@2003Augest");

    if (!_id) {
      return res.status(400).json({
        status: 400,
        message: "invalid token please login again to get the token",
      });
    }
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "user not found",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(404).json({
      status: 404,
      message: error.message,
    });
  }
};
