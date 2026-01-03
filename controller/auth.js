const bcrypt = require("bcrypt");
const User = require("../model/user");
const jwt = require("jsonwebtoken");

// login
exports.login = async (req, res) => {
  try {
    if (!req.body.email) {
      throw new Error("invalid credentials");
    }
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      throw new Error("invalid credentials");
    }

    const result = await user.IsPasswordCurrect(req.body.password);

    if (result) {
      const token = await user.getJWTToken();
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.status(200).send("user login successfully");
    } else {
      res.status(404).send("invalid credentailas");
    }
  } catch (err) {
    res.status(404).send("Error: " + err.message);
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
    res.send("data inserted successfully");
  } catch (err) {
    res.status(400).send("error saving the user : " + err.message);
  }
};

exports.logout = async (req, res) => {
  res
    .cookie("token", null, { expires: new Date(Date.now()) })
    .status(200)
    .send("logout successfully");
};

exports.auth = async (req, res, next) => {
  try {
    const { token } = req?.cookies;

    if (!token) {
      throw new Error("token not found");
    }
    const { _id } = await jwt.verify(token, "sharda@deviRaushan@2003Augest");

    if (!_id) {
      throw new Error("invalid token please login again to get the token");
    }
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("user not found");
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(400).send("Error : " + error.message);
  }
};
