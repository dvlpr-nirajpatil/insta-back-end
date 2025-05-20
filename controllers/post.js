const logger = require("../core/logger");
const response = require("../core/response");
const Post = require("../models/post");
const { post } = require("../routes/posts");

module.exports.createPost = async function (req, res) {
  const { imageUrl, caption } = req.body;

  if (!imageUrl) {
    return response(res, 400, "Image URL is required");
  }

  try {
    const post = new Post({
      userId: req.user.userId,
      imageUrl,
      caption,
    });

    await post.save();
    return response(res, 201, "Post created successfully", post);
  } catch (error) {
    logger.error(error);
    return response(res, 500, "Internal Server Error");
  }
};

module.exports.deletePost = async function (req, res) {
  const { postId } = req.params;
  if (!postId) {
    return response(res, 400, "Post ID is required");
  }
  try {
    const post = await Post.findByIdAndDelete(postId);
    if (!post) {
      return response(res, 404, "Post not found");
    }
    return response(res, 200, "Post deleted successfully");
  } catch (error) {
    logger.error(error);
    return response(res, 500, "Internal Server Error");
  }
};

module.exports.getAllPosts = async function (req, res) {
  try {
    const posts = await Post.find();
    if (!posts) {
      return response(res, 404, "No posts found");
    }
    if (posts.length === 0) {
      return response(res, 404, "No posts found");
    }
    return response(res, 200, "Posts fetched successfully", posts);
  } catch (error) {
    logger.error(error);
    return response(res, 500, "Internal Server Error");
  }
};

module.exports.likePost = async function (req, res) {
  const { postId } = req.params;
  try {
    const post = await Post.findById(postId);
    if (!post) {
      return response(res, 400, "Post Not Found");
    }

    const alreadyLiked = post.likes.some(
      (like) => like.userId.toString() === req.user.userId.toString()
    );

    if (alreadyLiked) {
      await Post.findByIdAndUpdate(postId, {
        $pull: { likes: { userId: req.user.userId } },
      });
      return response(res, 200, "Post unliked successfully");
    } else {
      await Post.findByIdAndUpdate(postId, {
        $push: { likes: { userId: req.user.userId } },
      });
      return response(res, 200, "Post liked successfully");
    }
  } catch (error) {
    logger.error(error);
    return response(res, 500, "Internal Server Error");
  }
};

module.exports.commentPost = async function (req, res) {
  const { postId } = req.params;
  const { comment } = req.body;

  console.log(postId);

  if (!comment) {
    return response(res, 200, "Comment is required");
  }
  try {
    let post = await Post.findByIdAndUpdate(postId, {
      $push: {
        comments: {
          userId: req.user.userId,
          comment: comment,
        },
      },
    });
    return response(res, 200, "Comment Add Successfully", post);
  } catch (error) {
    logger.error(error);
    return response(res, 500, "Internal Server Error");
  }
};
