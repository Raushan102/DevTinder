const ConnectRequest = require("../model/connectionRequest");
const User=require('../model/user')
exports.handleConnectionRequest = async (req, res) => {
  try {
    const { toUserId, status } = req.params;
    const fromUserId = req.user._id;
    const allowedStatus=['interested','ignored'];

    // Better validation with proper status codes
    if (!toUserId) {
      return res.status(400).json({
        message: "To user ID not found",
        status: 400
      });
    }

    if (!fromUserId) {
      return res.status(401).json({
        message: "Sender not found: please login before sending the request",
        status: 401
      });
    }

    if (!status) {
      return res.status(400).json({
        message: "Status not found",
        status: 400
      });
    }

    if(!allowedStatus.includes(status)){
      return res.status(400).json({
        message: "invalid status",
        status: 400
      });
    }

   const requestAllreadyExist=await ConnectRequest.findOne({
    $or:[{fromUserId,toUserId},{fromUserId:toUserId,toUserId:fromUserId}]
   })

   const receiver=await User.findOne({_id:toUserId});

   if(!receiver){
    return res.status(400).json({
        message: "invalid receiver",
        status: 400
      });
   }

   if(requestAllreadyExist){
    return res.status(400).json({
        message: "request all ready exist",
        status: 400
      });
   }



    const result = await new ConnectRequest({
      fromUserId,
      toUserId,
      status
    }).save();

    res.status(200).json({
      message: `${req.user.firstName}  ${status} ${status=='interested' ? 'in':''} ${receiver.firstName}`,
      status: 200,
      result,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error: " + error.message,
      status: 400
    });
  }
};
