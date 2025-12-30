const mongoose = require("mongoose");
const url =
  "mongodb+srv://raushankumarsaw952_db_user:Raushan%402003@cluster0.idrdatc.mongodb.net/devTinder?appName=Cluster0";

async function connect() {
  await mongoose.connect(url);
}

module.exports = connect;
