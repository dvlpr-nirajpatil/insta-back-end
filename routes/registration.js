const controller = require("../controllers/registration");
const bodyRequired = require("../middlewares/body_required");
const protect = require("../middlewares/protect");

const express = require("express");

express.Router();
const router = express.Router();

router.patch(
  "/registration",
  protect,
  bodyRequired,
  controller.storeRegistration
);

module.exports = router;
