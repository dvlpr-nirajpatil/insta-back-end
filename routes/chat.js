const chatController = require("../controllers/chat");

const express = require("express");

const protectRoute = require("../middlewares/protect");

const router = express.Router();

router.post("/chat/:id", protectRoute, chatController.createChat);
router.post("/join-chat/:id", protectRoute, chatController.joinGroup);

module.exports = router;
