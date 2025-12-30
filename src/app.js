const connect = require("../config/database");
const User = require("../model/user");
const express = require("express");
const app = express();
app.use(express.json());
app.post("/signup", async (req, res) => {
  try {
    await new User(req.body).save();
    res.send("data inserted successfully");
  } catch (err) {
    res.status(400).send("error saving the user : ", err.message);
  }
});

connect()
  .then(() => {
    console.log("connection established with database");
    app.listen(3000, () => {
      console.log("server running on port 3000");
    });
  })
  .catch((err) => console.log(err));
