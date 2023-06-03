const { HttpError } = require("../utils/HttpError");
const { Task } = require("../models/Task");

const getTasksService = async (page, limit, completed, userId) => {
  const skip = (page - 1) * limit;
  const filter = {
    owner: userId,
  };
  if (completed === "true") {
    filter.completed = true;
  } else if (completed === "false") {
    filter.completed = false;
  }

  return await Task.find(filter).skip(skip).limit(limit);
};

const getTaskService = async (id, userId) => {
  const task = await Task.findOne({ _id: id, owner: userId });
  if (!task) {
    throw new HttpError(404, "Task is not found");
  }
  return task;
};

const createTaskService = async (data, userId) => {
  return await Task.create({ ...data, owner: userId });
};

const updateTaskService = async (id, data, userId) => {
  const editedTask = await Task.findOneAndUpdate(
    { _id: id, owner: userId },
    data,
    { new: true }
  );
  if (!editedTask) {
    throw new HttpError(404, "Task is not found");
  }
  return editedTask;
};

const deleteTaskService = async (id, userId) => {
  const task = await Task.findOneAndDelete({ _id: id, owner: userId });
  if (!task) {
    throw new HttpError(404, "Task is not found");
  }
  return task;
};

module.exports = {
  getTasksService,
  getTaskService,
  createTaskService,
  updateTaskService,
  deleteTaskService,
};
