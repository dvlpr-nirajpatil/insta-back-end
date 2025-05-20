const controller = require("../controllers/post");

const express = require("express");
const protected = require("../middlewares/protect");
const bodyRequired = require("../middlewares/body_required");

const router = express.Router();

router.get("/get-all-posts", protected, controller.getAllPosts);
router.post("/create-post", bodyRequired, protected, controller.createPost);
router.delete("/delete-post/:postId", protected, controller.deletePost);
router.patch("/like-post/:postId", protected, controller.likePost);
router.patch(
  "/comment-post/:postId",
  bodyRequired,
  protected,
  controller.commentPost
);

module.exports = router;
