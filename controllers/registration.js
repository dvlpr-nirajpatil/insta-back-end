const User = require("../models/user");
const response = require("../core/response");
const logger = require("../core/logger");

module.exports.storeRegistration = async function (req, res) {
  const { name, userName, bio } = req.body;
  if (!name || !userName) {
    return response(
      res,
      400,
      `${(name, userName, bio)} All fields are required`
    );
  }

  try {
    const user = await User.findByIdAndUpdate(
      req.user.userId,
      {
        name,
        userName,
        bio,
      },
      { new: true }
    );
    if (!user) {
      return response(res, 404, "User not found");
    }

    return response(res, 200, "User updated successfully", user);
  } catch (error) {
    logger.error(error);
    return response(res, 500, "Internal Server Error");
  }
};

module.exports.checkUsernameAvailable = async function (req, res) {
  const userName = req.params.userName;
  if (!userName) {
    return response(res, 400, "username is required");
  }

  try {
    let user = await User.findOne({ userName: userName });

    if (user) {
      return response(res, 404, "Username alredy exists");
    }
    return response(res, 200, "Username available");
  } catch (e) {
    logger.error(e);
    return response(res, 500, "INTERNAL SERVER ERROR");
  }
};
