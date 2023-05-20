const { HttpError } = require("../utils/HttpError");

const { Task } = require("../models/Task");

const getTasksService = async (page, limit, completed) => {
  const skip = (page - 1) * limit;
  const filter = {};
  if (completed === "true") {
    filter.completed = true;
  } else if (completed === "false") {
    filter.completed = false;
  }
  return await Task.find(filter).skip(skip).limit(limit);
};
const getTaskService = async (id) => {
  const task = await Task.findById(id);

  if (!task) {
    throw new HttpError(404, "Task is not found");
  }
};

const createTaskService = async (data) => {
  return await Task.create(data);
};

const updateTaskService = async (id, data) => {
  const editedTask = Task.findByIdAndUpdate(id, data, { new: true });

  if (!editedTask) {
    throw new HttpError(404, "Task is not found");
  }

  return editedTask;
};

const deleteTaskService = async (id) => {
  const deletedTask = await Task.findByIdAndDelete(id);
  if (!deletedTask) {
    throw new HttpError(404, "Task is not found");
  }
  return deletedTask;
};

module.exports = {
  getTasksService,
  getTaskService,
  createTaskService,
  updateTaskService,
  deleteTaskService,
};
