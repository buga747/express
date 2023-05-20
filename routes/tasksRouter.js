const express = require("express");
const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/tasksControllers");

const router = express.Router();
router.route("/").get(getTasks).post(createTask);
router.route("/:taskId").get(getTask).patch(updateTask).delete(deleteTask);

// router.get("/", getTasks);

// router.get(`/:taskId`, getTask);

// router.post(
// "/",
//   (req, res, next) => {
//     console.log("Hello from middleware!");
//     next();
//   },
// createTask;
// );

// router.patch("/:taskId", updateTask);

// router.delete("/:taskId", deleteTask);

module.exports = {
  tasksRouter: router,
};
