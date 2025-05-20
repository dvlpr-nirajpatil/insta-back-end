const controller = require("../controllers/auth");

const express = require("express");
const bodyRequired = require("../middlewares/body_required");

const router = express.Router();

router.post("/sign-in", bodyRequired, controller.signIn);
router.post("/sign-up", bodyRequired, controller.signUp);
router.post("/sign-out", bodyRequired, controller.signOut);
router.post("/refresh-token", bodyRequired, controller.refreshToken);

module.exports = router;
