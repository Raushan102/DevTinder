const User = require("../model/user");
const ConnectRequest = require("../model/connectionRequest");
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
  try {
    const { status } = req.params;

    if (!req.user) {
      return res.status(400).json({
        status: 400,
        message: "invalid credentials",
      });
    }

    const allowedstatus = ["accepted", "rejected"];

    const isValidStatus = allowedstatus.includes(status);

    if (!isValidStatus) {
      return res.status(400).json({
        status: 400,
        message: "invalid status ",
      });
    }

    const checkConnectionRequest = await ConnectRequest.findOne({
      _id: req.params.connectionId,
      status: "interested",
      toUserId: req.user._id,
    });
 

    if (!checkConnectionRequest) {
      return res.status(400).json({
        status: 400,
        message: "connection not found ",
      });
    }

    checkConnectionRequest.status = status;

    const result = await checkConnectionRequest.save();
    res.status(200).json({
      status: 200,
      message: `request is ${status}`,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error.message,
    });
  }
};
