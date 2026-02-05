const express = require("express");
const Chat = require("../../model/chat");
const router = express.Router();
const authController = require("../../controller/auth");
const User = require("../../model/user");
router.get("/chat/:targetUserId", authController.auth, async (req, res) => {
  const { targetUserId } = req?.params;
  const userId = req.user._id;
  try {
    if (!targetUserId) {
      return res.status(404).json({
        status: 404,
        message: "user id not found to connect please pass the user Id",
      });
    }
    const targetUserExit = await User.findOne({
      _id: targetUserId,
    });

    if (!targetUserExit) {
      return res.status(404).json({
        status: 404,
        message: "user that you want to chat is not found",
      });
    }

    const chats = await Chat.findOne({
      participants: { $all: [userId, targetUserId] },
    }).populate({
      path:"messages.senderId",
      select:'firstName lastName photoUrl'
    })

    if (!chats) {
      chats = new Chat({
        participants: [userId, targetUserId],
        messages: [],
      });
    }

    res.status(200).json({
      status: 200,
      message: "chat fetched successfully",
      data: chats,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error.message,
    });
  }
});

module.exports = router;
