const Task = require('../models/Task');

const getTasks = async (req, res) => {
  try {
    const { search } = req.query; // Get search query
    let query = { user: req.user.id };

    if (search) {
      query.title = { $regex: search, $options: "i" }; // Case-insensitive search
    }

    const tasks = await Task.find(query);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


const createTask = async (req, res) => {
  try {
    const { title, description, priority, dueDate } = req.body;
    
    const task = new Task({
      user: req.user.id,
      title,
      description,
      priority,
      dueDate: new Date(dueDate),
      status: 'Incomplete'
    });

    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getTaskById = async (req, res) => {
  try {
    console.log('Finding task:', req.params.id); // Debug log
    const task = await Task.findById(req.params.id);
    
    if (!task) {
      console.log('Task not found');
      return res.status(404).json({ message: 'Task not found' });
    }

    console.log('Found task:', task); // Debug log
    res.json(task);
  } catch (err) {
    console.error('Controller error:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};

const updateTask = async (req, res) => {
  try {
    console.log("Received update request for task:", req.params.id);
    console.log("Update data:", req.body);

    const task = await Task.findById(req.params.id);
    
    if (!task) {
      console.log("Task not found.");
      return res.status(404).json({ message: "Task not found" });
    }
    
    if (task.user.toString() !== req.user.id) {
      console.log("User not authorized.");
      return res.status(401).json({ message: "Not authorized" });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    console.log("Updated task:", updatedTask);
    res.json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(400).json({ message: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await task.deleteOne();
    res.json({ message: 'Task removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};