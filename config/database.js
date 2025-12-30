require("dotenv").config();
const mongoose = require("mongoose");
const url = process.env.MONGODB_URI;

async function connect() {
  await mongoose.connect(url);
}

module.exports = connect;
