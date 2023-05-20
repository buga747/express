const express = require("express");
const { tasksRouter } = require("./routes/tasksRouter");
const { authRouter } = require("./routes/authRouter");

const app = express();

app.use(express.json());

app.use("/tasks", tasksRouter);

app.use("/auth", authRouter);

app.use((error, req, res, next) => {
  console.log(error);
  res.status(error.statusCode || 500).json({
    message: error.message || "Something went wrong. Please, try again later",
  });
});

module.exports = {
  app,
};
