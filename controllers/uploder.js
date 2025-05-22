// controllers/post.js
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const { v4: uuid } = require("uuid");
const User = require("../models/user");

module.exports.uploadImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No images uploaded" });
    }

    const uploadedPaths = [];

    for (const file of req.files) {
      const filename = `${uuid()}.webp`;
      const outputPath = path.join(__dirname, "..", "uploads", filename);

      await sharp(file.buffer).webp({ quality: 70 }).toFile(outputPath);

      uploadedPaths.push(`/uploads/${filename}`);
    }

    return res.status(201).json({
      message: "Images uploaded successfully",
      images: uploadedPaths,
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
};


module.exports.uploadSingleImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    const filename = `${uuid()}.webp`;
    const outputPath = path.join(__dirname, "..", "uploads", filename);

    await sharp(req.file.buffer)
      .webp({ quality: 70 })
      .toFile(outputPath);

    let profilePicUrl = `/uploads/${filename}`;


    let user = await User.findByIdAndUpdate(req.user.userId, { profilePic: profilePicUrl });




    return res.status(201).json({
      message: "Profile picture uploaded successfully",
      user
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
};