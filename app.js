require("dotenv").config();
require("./config/db_connect");
const express = require("express");
const logger = require("./core/logger");
const { response } = require("./core/response");
const winstonMorgan = require("./middlewares/winston_morgan_middleware");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const authRoutes = require("./routes/auth");
const registrationRoutes = require("./routes/registration");
const uploadRoutes = require("./routes/upload");
const postRoutes = require("./routes/posts");
const chatRoutes = require("./routes/chat");
const messageRoutes = require("./routes/messages");

app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // ex
app.use(winstonMorgan(logger));
app.use("/api/v1/", authRoutes);
app.use("/api/v1/", registrationRoutes);
app.use("/api/v1/", uploadRoutes);
app.use("/api/v1/", postRoutes);
app.use("/api/v1/", chatRoutes);
app.use("/api/v1/", messageRoutes);

app.get("/", (req, res) => {
  return response(res, 200, "Welcome to Reshimgathi");
});

app.listen(process.env.PORT, () => {
  logger.info(`Server is listening on port ${process.env.PORT}`);
});
