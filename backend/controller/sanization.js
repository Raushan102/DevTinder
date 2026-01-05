const sanization = require("../src/util/data_Sanization");

exports.sanization = async (req, res, next) => {
  if (req.body) {
    try {
      sanization.sanization(req.body);
    } catch (error) {
      res.status(400).send("something went wrong " + error.message);
    }
  }

  next();
};
