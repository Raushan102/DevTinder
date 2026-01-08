const User = require("../model/user");
const sanization = require("../src/util/data_Sanization");
exports.getProfile = async (req, res) => {
  try {
    res.status(200).json({
      status: 200,
      message: "profile data fetched successfully",
      data: req.user,
    });
  } catch (error) {
    res.status(404).json({
      status: 404,
      message: error.message,
    });
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
      status: 200,
      message: "user profile is updated successfully",
      user: req.user,
    });
  } catch (error) {
    res.status(404).json({
      status: 404,
      message: error.message,
    });
  }
};
