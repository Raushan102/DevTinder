const User = require("../model/user");
const ConnectRequest = require("../model/connectionRequest");
const mongoose = require("mongoose");
const sendEmail = require("../config/sendEmail");
exports.handleConnectionRequest = async (req, res) => {
  try {
    const { toUserId, status } = req.params;
    const fromUserId = req.user._id;
    const allowedStatus = ["interested", "ignored"];

    // Better validation with proper status codes
    if (!toUserId) {
      return res.status(400).json({
        status: 400,
        message: "To user ID not found",
      });
    }

    if (!fromUserId) {
      return res.status(401).json({
        status: 401,
        message: "Sender not found: please login before sending the request",
      });
    }

    if (!status) {
      return res.status(400).json({
        status: 400,
        message: "Status not found",
      });
    }

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        status: 400,
        message: "invalid status",
      });
    }

    const requestAllreadyExist = await ConnectRequest.findOne({
      $or: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId },
      ],
    });

    const receiver = await User.findOne({ _id: toUserId });

    if (!receiver) {
      return res.status(400).json({
        status: 400,
        message: "invalid receiver",
      });
    }

    if (requestAllreadyExist) {
      return res.status(400).json({
        status: 400,
        message: "request all ready exist",
      });
    }

    const result = await new ConnectRequest({
      fromUserId,
      toUserId,
      status,
    }).save();

    res.status(200).json({
      message: `${req.user.firstName}  ${status} ${
        status == "interested" ? "in" : ""
      } ${receiver.firstName}`,
      status: 200,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: "Error: " + error.message,
    });
  }
};

exports.reviewConnectionRequest = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  let user = null;

  try {
    const { status, connectionId } = req.params;

    if (!req.user) {
      await session.abortTransaction();
      return res.status(400).json({
        status: 400,
        message: "invalid credentials",
      });
    }

    const allowedStatus = ["accepted", "rejected"];

    if (!allowedStatus.includes(status)) {
      await session.abortTransaction();
      return res.status(400).json({
        status: 400,
        message: "invalid status",
      });
    }

    const checkConnectionRequest = await ConnectRequest.findOne({
      _id: connectionId,
      status: "interested",
      toUserId: req.user._id,
    }).session(session);

    if (!checkConnectionRequest) {
      await session.abortTransaction();
      return res.status(400).json({
        status: 400,
        message: "connection not found",
      });
    }

    checkConnectionRequest.status = status;

    if (status === "accepted") {
      // Update both users atomically
      user = await User.findByIdAndUpdate(
        req.user._id,
        {
          $addToSet: { connections: checkConnectionRequest.fromUserId },
        },
        { session, returnDocument: "after" },
      );

      await User.findByIdAndUpdate(
        checkConnectionRequest.fromUserId,
        { $addToSet: { connections: req.user._id } },
        { session },
      );
    }

    await checkConnectionRequest.save({ session });

    await session.commitTransaction();

    res.status(200).json({
      status: 200,
      message: `request is ${status}`,
      data: user ? user : req.user,
    });
  } catch (error) {
    await session.abortTransaction();
    res.status(400).json({
      status: 400,
      message: error.message,
    });
  } finally {
    session.endSession();
  }
};

exports.getConnectedDeveloper = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({
        status: 401,
        message: "invalid credential please login  ",
      });
    }

    if (!user.connections) {
      return res.status(200).json({
        status: 200,
        message: "successful",
        data: [],
      });
    }

    const connectionsOfUser = await User.find({
      _id: { $in: user.connections },
    }).select(
      "firstName lastName age gender photoUrl headline profession about skills socialMedia github linkedin twitter",
    );

    if (connectionsOfUser) {
      res.status(200).json({
        status: 200,
        message: "connections fetched successfully",
        data: connectionsOfUser,
      });
    }
  } catch (error) {
    res.status(400).json({
      status: 200,
      message: error.message || "unable to fetch the connections",
    });
  }
};
