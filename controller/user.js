const bcrypt = require("bcrypt");
const User = require("../model/user");
const jwt = require("jsonwebtoken");


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


exports.getProfile = async (req, res) => {
  try {
    res.send(req.user);
  } catch (error) {
    res.status(400).send("Error: " + error.message);
  }
};


