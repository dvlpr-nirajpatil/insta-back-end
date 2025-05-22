const response = require("../core/response");
const Message = require("../models/message");

module.exports.sendMessage = async function (req, res) {
  const { chatId, message } = req.body;

  if (!chatId || !message) {
    return response(res, 400, "chatId and message is required");
  }

  try {
    let newMessage = new Message({ chatId, message, sender: req.user.userId });
    await newMessage.save();
    return response(res, 201, "Message succesfully sent", newMessage);
  } catch (e) {
    logger.error(e);
    return response(res, 500, "INTERNAL SERVER ERROR");
  }
};

module.exports.getMessages = async function (req, res) {
  const chatId = req.params.id;

  if (!chatId) {
    return response(res, 400, "Chat ID is required");
  }

  try {
    const messages = await Message.find({ chatId: chatId })
      .sort({ timestamp: 1 }) // Ascending order (oldest to newest)
      .populate(
        "sender",
        "-password -createdAt -updatedAt -__v -bio -userName"
      ); // Optional: populate sender details

    return response(res, 200, "Messages fetched successfully", messages);
  } catch (e) {
    logger?.error?.(e); // optional logging
    return response(res, 500, "INTERNAL SERVER ERROR");
  }
};
