const express = require("express");
const validate = require("../../controller/sanization");
const router = express.Router();

router.use(validate.sanization);

module.exports = router;
