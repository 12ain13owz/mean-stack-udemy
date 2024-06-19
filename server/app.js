const express = require("express");
const app = express();
const path = require("path");
const morgan = require("morgan");
const mongoose = require("mongoose");

const postsRoutes = require("./routes/post.routes");
const userRoutes = require("./routes/user.routes");

mongoose
  .connect(`mongodb://localhost:27017/`, { dbName: "tutarial-mean" })
  .then(() => {
    console.log("Connected to mongo atlas");
  })
  .catch((err) => {
    console.log("Connection failed:", err);
  });

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("server/images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  next();
});
app.use("/api/posts", postsRoutes);
app.use("/api/user", userRoutes);

module.exports = app;
