// controllers/post.js
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const { v4: uuid } = require("uuid");

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
