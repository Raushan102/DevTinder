const mongoose = require("mongoose");

const connectionSchema = new mongoose.Schema({
  fromUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  toUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["ignored", "interested", "accepted", "rejected"],
    message: "{VALUE} is incurrect status type",
    required: "true",
  },
});

connectionSchema.pre("save", async function () {
  const connectionRequest = this;
  if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
    throw new Error("can not make connection request to your self ");
  }
  // this is a middleware but i am not calling next because When the async function completes (resolves),
  //  Mongoose automatically moves to the next middleware or completes the operation .more in notes(notion)
});

connectionSchema.index({fromUserId:1,toUserId:1})

const ConnectRequestModel = mongoose.model("ConnectRequest", connectionSchema);

module.exports = ConnectRequestModel;
