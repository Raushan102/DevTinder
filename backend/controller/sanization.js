const sanization = require("../src/util/data_Sanization");

exports.sanization = async (req, res, next) => {
  if (req.body) {
    try {
      sanization.sanization(req.body);
    } catch (error) {
      return res.status(400).json({
        status: 400,
        message: error.message,
      });
    }
  }

  next();
};
