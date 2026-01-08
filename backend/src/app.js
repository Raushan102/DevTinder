const express = require("express");
const connect = require("../config/database");
const dataValidation = require("./routes/validate");
const cookieParse = require("cookie-parser");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const userRouter = require("./routes/user");
const requestRouter = require("./routes/request");
const cors = require("cors");

const app = express();
//cors error solved
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParse());
app.use(dataValidation);
app.use("/request", requestRouter);
app.use("/profile", profileRouter);
app.use("/", authRouter);

app.use(userRouter);
connect()
  .then(() => {
    console.log("connection established with database");
    app.listen(3000, () => {
      console.log("server running on port 3000");
    });
  })
  .catch((err) => console.log(err));
