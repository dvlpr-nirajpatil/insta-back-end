const messageController = require("../controllers/message");
const protectRoute = require("../middlewares/protect");
const payloadRequired = require("../middlewares/body_required");
const express = require("express");
const bodyRequired = require("../middlewares/body_required");

const router = express.Router();

router.post(
  "/message/send",
  bodyRequired,
  protectRoute,
  messageController.sendMessage
);
router.get("/message/:id", protectRoute, messageController.getMessages);

module.exports = router;
