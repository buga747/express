const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");
const { HttpError } = require("../utils/HttpError");

const { Task } = require("../models/Task");

// const tasksPath = path.join(__dirname, "..", 'db', 'tasks.json')

const getTasksService = async () => {
  return await Task.find();
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
