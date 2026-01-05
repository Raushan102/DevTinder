const User = require("../model/user");
const sanization = require("../src/util/data_Sanization");
exports.getProfile = async (req, res) => {
  try {
    res.send(req.user);
  } catch (error) {
    res.status(400).send("Error: " + error.message);
  }
};

exports.updateUser = async (req, res) => {
  try {
    sanization.CanUpdateTheseFields(req);
    Object.keys(req.body).forEach((element) => {
      req.user[element] = req.body[element];
    });

 

    await req.user.save();

    res.status(200).json({
      message: "user profile is updated successfully",
      status: 200,
      user: req.user,
    });
  } catch (err) {
    res.status(400).send("Error  : " + err.message);
  }
};
