const mongoose = require("mongoose");

const tokenSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    token: { type: String, required: true },
    fcmToken: { type: String },
    expiry: { type: Date, required: true },
    deviceId: { type: String, required: true, unique: true },
  },
  { timestamp: true }
);

const session = mongoose.model("session", tokenSchema);

module.exports = session;
