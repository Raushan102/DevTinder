const bcrypt = require("bcrypt");
const User = require("../model/user");
const jwt = require("jsonwebtoken");

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
//get user
exports.getUser = async (req, res) => {
  try {
    const user = await User.find();
    res.send(user);
  } catch (err) {
    res.status(400).send("error saving the user : " + err.message);
  }
};

//update user
exports.updateUser = async (req, res) => {
  const id = req.body.id;

  try {
    if (req.body.email) {
      throw new Error(
        "can not undate email please create new account with different email"
      );
    }
    const user = await User.findByIdAndUpdate(id, req.body, {
      ReturnDocument: "before",
      runValidators: true,
      includeResultMetaData: true,
    });

    res.send(user);
  } catch (err) {
    res.status(400).send("error saving the user : " + err.message);
  }
};
//delete user
exports.deleteUser = async (req, res) => {
  const id = req.body.id;
  try {
    const user = await User.findByIdAndDelete(id);
    res.send(user);
  } catch (error) {
    res.status(400).send("error saving the user : " + err.message);
  }
};
// login controller
exports.login = async (req, res) => {
  try {
    if (!req.body.email) {
      throw new Error("invalid credentials");
    }
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      throw new Error("invalid credentials");
    }

    const result = await bcrypt.compare(req.body.password, user.password);

    if (result) {
      const token = jwt.sign(
        { _id: user._id },
        "sharda@deviRaushan@2003Augest",
        { expiresIn: "7d" }
      );
      res.cookie("token", token,{expires: new Date(Date.now() + 8 * 3600000)});
      res.status(200).send("user login successfully");
    } else {
      res.status(404).send("invalid credentailas");
    }
  } catch (err) {
    res.status(404).send("Error: " + err.message);
  }
};

exports.getProfile = async (req, res) => {
  try {
    res.send(req.user);
  } catch (error) {
    res.status(400).send("Error: " + error.message);
  }
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
    res.status(400).send("Error : "+error.message);
  }
};
