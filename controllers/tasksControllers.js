const {
  getTasksService,
  getTaskService,
  createTaskService,
  updateTaskService,
  deleteTaskService,
} = require("../services/tasksServices");

const { catchAsyncWrapper } = require("../utils/catchAsyncWrapper");

let getTasks = async (req, res, next) => {
  const { page = 1, limit = 10, completed } = req.query;
  const userId = req.user._id;
  const tasks = await getTasksService(page, limit, completed, userId);
  res.status(200).json(tasks);
};

getTasks = catchAsyncWrapper(getTasks);

const getTask = catchAsyncWrapper(async (req, res, next) => {
  const { taskId } = req.params;
  const userId = req.user._id;
  const task = await getTaskService(taskId, userId);
  res.status(200).json(task);
});

const createTask = catchAsyncWrapper(async (req, res, next) => {
  const userId = req.user._id;
  const newTask = await createTaskService(req.body, userId);
  res.status(201).json(newTask);
});

const updateTask = catchAsyncWrapper(async (req, res, next) => {
  const { taskId } = req.params;
  const userId = req.user._id;
  const updatedTask = await updateTaskService(taskId, req.body, userId);
  res.status(200).json(updatedTask);
});

const deleteTask = catchAsyncWrapper(async (req, res, next) => {
  const { taskId } = req.params;
  const userId = req.user._id;
  const deletedTask = await deleteTaskService(taskId, userId);
  // res.sendStatus(204)
  console.log(deletedTask);
  res.status(200).json(deletedTask);
});

module.exports = {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
