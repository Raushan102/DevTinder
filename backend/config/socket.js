// config/socket.js
const socket = require("socket.io");
const Chat = require("../model/chat");
function initializeSocket(server) {
  const io = socket(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    socket.on("joinChat", ({ userId, targetUserId }) => {
      // 🛠️ Create a unique room for these two users
      const roomId = [userId, targetUserId].sort().join("_");
      socket.join(roomId);
      console.log(`User joined room: ${roomId}`);
    });

    socket.on(
      "sendMessage",
      async ({ firstName,photoUrl, userId, targetUserId, text }) => {
        try {
          const roomId = [userId, targetUserId].sort().join("_");

          io.to(roomId).emit("messageReceived", {
            firstName: firstName,
            text: text,
            photoUrl:photoUrl,
            senderId:userId,
            timestamp: new Date(),
          });
          
          let chat = await Chat.findOne({
            participants: { $all: [userId, targetUserId] },
          });

          if (!chat) {
            chat = new Chat({
              participants: [userId, targetUserId],
              messages: [],
            });
          }

          chat.messages.push({
            senderId: userId,
            text,
          });

          await chat.save();

          console.log(firstName + "=" + text);

        } catch (error) {
          console.log(error);
        }
      },
    );

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
}

module.exports = initializeSocket;
