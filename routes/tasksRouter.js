const express = require("express");
const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/tasksControllers");
const { validateBody } = require("../utils/validateBody");

const {
  createTaskValidationSchema,
  updateTaskValidationSchema,
} = require("../utils/validation/taskValidationSchema");
const { auth } = require("../middlawares/auth");

const router = express.Router();
router
  .route("/")
  .get(auth, getTasks)
  .post(auth, validateBody(createTaskValidationSchema), createTask);

router
  .route("/:taskId")
  .get(auth, getTask)
  .patch(auth, validateBody(updateTaskValidationSchema), auth, updateTask)
  .delete(auth, deleteTask);

module.exports = {
  tasksRouter: router,
};
