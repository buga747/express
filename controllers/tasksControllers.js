const {
  getTasksService,
  getTaskService,
  createTaskService,
  updateTaskService,
  deleteTaskService,
} = require("../services/tasksServices");

const { catchAsyncWrapper } = require("../utils/catchAsyncWrapper");

// let getTasks = async (req, res, next) => {
//   try {
//     const tasks = await getTasksService();
//     res.status(200).json(tasks);
//   } catch (err) {
//     next(err);
//   }
// };

// getTasks = catchAsyncWrapper(getTasksService);

const getTasks = catchAsyncWrapper(async (req, res, next) => {
  const tasks = await getTasksService();
  res.status(200).json(tasks);
});

const getTask = catchAsyncWrapper(async (req, res, next) => {
  const { taskId } = req.params;
  const task = await getTaskService(taskId);
  res.status(200).json(task);
});

const createTask = catchAsyncWrapper(async (req, res, next) => {
  console.log(req.body);
  const newTask = await createTaskService(req.body);
  res.status(201).json(newTask);
});

const updateTask = catchAsyncWrapper(async (req, res, next) => {
  const { taskId } = req.params;
  const updatedTask = await updateTaskService(taskId, req.body);
  res.status(200).json(updatedTask);
});

const deleteTask = catchAsyncWrapper(async (req, res, next) => {
  const { taskId } = req.params;
  const deletedTask = await deleteTaskService(taskId);
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
