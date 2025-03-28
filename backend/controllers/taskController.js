const Task = require("../models/taskModel");

const createTask = async (req, res) => {
  try {
    const { title, description, priority, dueDate, status } = req.body;

    if (!title || !description || !priority || !dueDate || !status) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const task = new Task({
      user: req.user.id, // Ensure user is attached
      title,
      description,
      priority,
      dueDate,
      status,
    });

    await task.save();
    res.status(201).json(task);
  } catch (error) {
    console.error("Error in createTask:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createTask };
