const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");
const { HttpError } = require("../utils/HttpError");

// const tasksPath = path.join(__dirname, "..", 'db', 'tasks.json')
const tasksPath = path.join(process.cwd(), "db", "tasks.json");

const getTasksService = async () => {
  const tasks = await fs.readFile(tasksPath);
  return JSON.parse(tasks);
};

const getTaskService = async (id) => {
  const tasks = await getTasksService();
  return tasks.find((task) => task.id === id);
};

const createTaskService = async (data) => {
  const tasks = await getTasksService();
  const newTask = { id: crypto.randomUUID(), ...data };

  tasks.push(newTask);
  fs.writeFile(tasksPath, JSON.stringify(tasks, null, 2));
  return newTask;
};

const updateTaskService = async (id, data) => {
  const tasks = await getTasksService();
  const editedTask = tasks.find((task) => task.id === id);
  if (!editedTask) {
    throw new HttpError(404, "Task is not found");
  }
  editedTask.title = data.title || editedTask.title;
  editedTask.completed = data.completed || editedTask.completed;
  fs.writeFile(tasksPath, JSON.stringify(tasks, null, 2));
  return editedTask;
};

const deleteTaskService = async (id) => {
  const tasks = await getTasksService();
  const index = tasks.findIndex((task) => task.id === id);
  if (index === -1) {
    throw new HttpError(404, "Task is not found");
  }
  const [deletedTask] = tasks.splice(index, 1);
  await fs.writeFile(tasksPath, JSON.stringify(tasks, null, 2));
  return deletedTask;
};

module.exports = {
  getTasksService,
  getTaskService,
  createTaskService,
  updateTaskService,
  deleteTaskService,
};
