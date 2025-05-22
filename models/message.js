const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
  {
    chatId: { type: mongoose.Types.ObjectId, ref: "Chat", required: true },
    sender: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    message: String,
    status: {
      type: String,
      enum: ["sent", "deliverd", "read"],
      default: "sent",
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
