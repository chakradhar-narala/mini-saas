const { getModels } = require("../models");

exports.createTask = async (req, res) => {
  const { Task } = getModels();
  const task = await Task.create({
    title: req.body.title,
    userId: req.user.id,
  });
  res.json(task);
};

exports.getTasks = async (req, res) => {
  const { Task } = getModels();
  const tasks = await Task.findAll({
    where: { userId: req.user.id },
  });
  res.json(tasks);
};

exports.updateTask = async (req, res) => {
  const { Task } = getModels();
  const task = await Task.findOne({
    where: { id: req.params.id, userId: req.user.id },
  });

  if (!task) return res.status(404).json({ message: "Not found" });

  task.status = req.body.status;
  await task.save();
  res.json(task);
};

exports.deleteTask = async (req, res) => {
  const { Task } = getModels();
  const task = await Task.findOne({
    where: { id: req.params.id, userId: req.user.id },
  });

  if (!task) return res.status(404).json({ message: "Not found" });

  await task.destroy();
  res.json({ message: "Deleted" });
};