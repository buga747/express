const {
  getTasksService,
  getTaskService,
  createTaskService,
  updateTaskService,
  deleteTaskService,
} = require("../services/tasksServices");

const getTasks = async (req, res, next) => {
  try {
    const tasks = await getTasksService();
    res.status(200).json(tasks);
  } catch (err) {
    next(err);
  }
};

const getTask = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const task = await getTaskService(taskId);
    res.status(200).json(task);
  } catch (err) {
    next(err);
  }
};

const createTask = async (req, res, next) => {
  try {
    console.log(req.body);
    const newTask = await createTaskService(req.body);
    res.status(201).json(newTask);
  } catch (err) {
    next(err);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const updatedTask = await updateTaskService(taskId, req.body);
    res.status(200).json(updatedTask);
  } catch (err) {
    next(err);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const deletedTask = await deleteTaskService(taskId);
    // res.sendStatus(204)
    console.log(deletedTask);
    res.status(200).json(deletedTask);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
