const express = require("express");
const protect = require("../middlewares/protect");
const controller = require("../controllers/uploder");
const upload = require("../config/multer_config");

const router = express.Router();

router.post(
  "/upload-images",
  protect,
  upload.array("images", 10),
  controller.uploadImages
);


router.post('/uploadProfilePic', protect, upload.single("image"), controller.uploadSingleImage);


module.exports = router;
