const express = require("express");
const connect = require("../config/database");
const dataValidation = require("./routes/validate");
const cookieParse = require("cookie-parser");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const userRouter = require("./routes/user");
const requestRouter = require("./routes/request");
const paymentRouter = require("./routes/payment");
const cors = require("cors");
const otpRouter = require("./routes/otp");
const http = require("http");
const initializeSocket = require("../config/socket");
const chatRouter = require("./routes/chat");
const app = express();
require("dotenv").config();

// app.use(
//   cors({
//     origin: true, // Accept requests from ANY origin
//     credentials: true,
//   }),
// );

app.use(
  cors({
    origin: [
      "http://raushankumarsaw.in",
      "https://raushankumarsaw.in",
      "http://www.raushankumarsaw.in",
      "https://www.raushankumarsaw.in"
    ],
    credentials: true,
  }),
);

// CRITICAL: Middleware to capture raw body for webhook signature validation
const captureRawBody = (req, res, buf, encoding) => {
  if (buf && buf.length) {
    req.rawBody = buf.toString(encoding || "utf8");
  }
};

// Apply JSON parser with raw body capture
app.use(express.json({ verify: captureRawBody }));
app.use(cookieParse());
app.use(dataValidation);
app.use("/otp", otpRouter);
app.use("/request", requestRouter);
app.use("/profile", profileRouter);
app.use("/", authRouter);
app.use("/", chatRouter);
app.use("/payment", paymentRouter);

const Payment = require("../model/payment");
const User = require("../model/user");

const server = http.createServer(app);
initializeSocket(server);
app.use(userRouter);

// Background job to check and deactivate expired premium memberships
setInterval(
  async () => {
    try {
      const expiredPayments = await Payment.find({
        status: "successful",
        endDate: { $lt: new Date() },
      });

      for (const payment of expiredPayments) {
        await User.findByIdAndUpdate(payment.userId, {
          isPremium: false,
          membershipType: null,
        });
        // Mark payment as expired
        payment.status = "expired";
        await payment.save();
      }
      if (expiredPayments.length > 0) {
        console.log(
          `Deactivated ${expiredPayments.length} expired premium memberships.`,
        );
      }
    } catch (error) {
      console.error("Error in membership expiry check:", error);
    }
  },
  24 * 60 * 60 * 1000,
); // Runs once every 24 hours

connect()
  .then(() => {
    console.log("connection established with database");
    server.listen(3000, () => {
      console.log("server running on port 3000");
    });
  })
  .catch((err) => console.log(err));
