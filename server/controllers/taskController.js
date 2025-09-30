import Task from "../models/Task.js";

export const createTask = async (req, res) => {
  try {
    const { title, description, status, dueDate, userId } = req.body;

    if (!title?.trim() || !description?.trim() || !status?.trim() || !dueDate?.trim() || !userId?.trim()) {
      return res.status(400).json({ message: "Title, description, status, dueDate and userId are required and cannot be empty" });
    }

    const task = new Task({ title, description, status, dueDate, user: userId });
    await task.save();

    res.status(201).json({ message: "Task created", task });
  } catch (err) {
    res.status(500).json({ message: "Error creating task", error: err.message });
  }
};

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate("user", "email");
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Error fetching tasks", error: err.message });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate("user", "email");
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: "Error fetching task", error: err.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { title, description, status, dueDate } = req.body;

    if (!title?.trim() || !description?.trim() || !status?.trim() || !dueDate?.trim()) {
      return res.status(400).json({ message: "Title, description, status and dueDate are required and cannot be empty" });
    }

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, status, dueDate },
      { new: true }
    );
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task updated", task });
  } catch (err) {
    res.status(500).json({ message: "Error updating task", error: err.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting task", error: err.message });
  }
};
