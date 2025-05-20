const User = require("../models/user");
const response = require("../core/response");
const logger = require("../core/logger");
const jwt = require("../core/jwt");
const Session = require("../models/token");
const passwordManager = require("../core/password_manager");

module.exports.signIn = async function (req, res) {
  const { email, password, deviceId } = req.body;
  if (!email || !password) {
    return response(res, 400, "email and password are required");
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return response(res, 404, "User not found");
    }
    let passwordMatched = await passwordManager.comparePassword(
      password,
      user.password
    );
    if (!passwordMatched) {
      return response(res, 401, "Invalid password");
    }

    const payload = {
      email: user.email,
      userId: user._id,
    };
    const accessToken = jwt.generateAccessToken(payload);
    const refreshToken = jwt.generateRefreshToken(payload);

    await storeToken(user._id, refreshToken, deviceId);

    return response(res, 200, "Login successfully", {
      user,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    logger.error(error);
    return response(res, 500, "Internal Server Error");
  }
};

module.exports.signUp = async function (req, res) {
  const { email, password, deviceId } = req.body;
  if (!email || !password || !deviceId) {
    return response(res, 400, "All fields are required");
  }
  try {
    const hashPassword = await passwordManager.hashPassword(password);
    const user = new User({
      email,
      password: hashPassword,
    });

    await user.save();
    const payload = {
      email: user.email,
      userId: user._id,
    };
    const accessToken = jwt.generateAccessToken(payload);
    const refreshToken = jwt.generateRefreshToken(payload);

    await storeToken(user._id, refreshToken, deviceId);

    return response(res, 201, "User created successfully", {
      accessToken,
      refreshToken,
      user,
    });
  } catch (error) {
    logger.error(error);
    if (error.code === 11000) {
      return response(res, 409, "User already exists");
    }
    return response(res, 500, "Internal Server Error");
  }
};

module.exports.refreshToken = async function (req, res) {
  const { token } = req.body;

  if (!token) {
    return response(res, 400, "Token is required");
  }

  try {
    let user = await jwt.verifyRefreshToken(token);
    if (!user) {
      return response(res, 409, "Invalid token");
    }
    const session = await Session.findOne({ token });
    if (!session) {
      return response(res, 409, "Session Expired");
    }

    if (session.expiry < new Date()) {
      return response(res, 409, "Session Expired");
    }

    const payload = {
      id: user.id,
      email: user.email, // include whatever fields you want to store
    };

    const accessToken = jwt.generateAccessToken(payload);
    const refreshToken = jwt.generateRefreshToken(payload);

    await storeToken(user.id, refreshToken, session.deviceId);

    return response(res, 200, "Token Refreshed successfully", {
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.log(error);
    if (
      error.name === "JsonWebTokenError" &&
      error.message === "invalid signature"
    ) {
      return response(res, 401, "Invalid token");
    }
    logger.error(error);
    return response(res, 500, "Internal Server Error");
  }
};

module.exports.signOut = async function (req, res) {
  const { deviceId } = req.body;
  if (!deviceId) {
    return response(res, 400, "Device ID is required");
  }
  try {
    await Session.findOneAndDelete({ deviceId });
    return response(res, 200, "Logged out successfully");
  } catch (error) {
    logger.error(error);
    return response(res, 500, "Internal Server Error");
  }
};

async function storeToken(userId, token, deviceId) {
  try {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 15);
    await Session.findOneAndUpdate(
      { deviceId },
      {
        userId,
        token,
        expiry: expiryDate,
        deviceId,
      },
      { upsert: true, new: true }
    );
  } catch (error) {
    throw error;
  }
}
