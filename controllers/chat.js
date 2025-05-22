const response = require("../core/response");
const Chat = require("../models/chat");
const logger = require("../core/logger");

module.exports.createChat = async function (req, res) {
  const opponentId = req.params.id;

  if (!opponentId) {
    return response(res, 400, "opponent id is missing");
  }

  try {
    const chat = new Chat({
      participants: [opponentId, req.user.userId],
    });

    await chat.save();

    return response(res, 201, "chat successfully created", chat);
  } catch (e) {
    logger.error(e);

    return response(res, 500, "INTERNAL SERVER ERROR");
  }
};

module.exports.joinGroup = async function (req, res) {
  const chatId = req.params.id;

  if (!chatId) {
    return response(res, 400, "chat id is missing");
  }

  try {
    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      { $addToSet: { participants: req.user.userId } }, // prevents duplicate entries
      { new: true }
    ).populate("participants", "-password");

    return response(res, 200, "Join group successfully", updatedChat);
  } catch (e) {
    logger.error(e);
    return response(res, 500, "INTERNAL SERVER ERROR");
  }
};
