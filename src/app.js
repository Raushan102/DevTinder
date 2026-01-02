const connect = require("../config/database");
const dataValidation=require('./routes/validate')
const cookieParse=require('cookie-parser')

const express = require("express");
const app = express();
const userRouter=require('./routes/user')
app.use(express.json());
app.use(cookieParse())
app.use(dataValidation)
app.use(userRouter);
connect()
  .then(() => {
    console.log("connection established with database");
    app.listen(3000, () => {
      console.log("server running on port 3000");
    });
  })
  .catch((err) => console.log(err));
