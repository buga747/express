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

const router = express.Router();
router
  .route("/")
  .get(getTasks)
  .post(validateBody(createTaskValidationSchema), createTask);

router
  .route("/:taskId")
  .get(getTask)
  .patch(validateBody(updateTaskValidationSchema), updateTask)
  .delete(deleteTask);

module.exports = {
  tasksRouter: router,
};
