import Task from "../models/Task.js";

export const createTask = async (req, res) => {
  try {
    const { title, description, status, dueDate, userId, priority } = req.body;

    if (
      !title?.trim() ||
      !description?.trim() ||
      !status?.trim() ||
      !dueDate?.trim() ||
      !userId?.trim()
    ) {
      return res.status(400).json({
        message:
          "Title, description, status, dueDate and userId are required and cannot be empty",
      });
    }

    const payload = { title, description, status, dueDate, user: userId };
    if (priority && ["low", "medium", "high"].includes(String(priority))) {
      payload.priority = priority;
    }

    const task = new Task(payload);
    await task.save();

    res.status(201).json({ message: "Task created", task });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating task", error: err.message });
  }
};

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate("user", "email");
    res.json(tasks);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching tasks", error: err.message });
  }
};

export const getTasksForUser = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) return res.status(400).json({ message: "userId is required" });
    const tasks = await Task.find({ user: userId }).populate("user", "email");
    res.json(tasks);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching tasks", error: err.message });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate("user", "email");
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching task", error: err.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { title, description, status, dueDate, priority } = req.body;

    if (
      !title?.trim() ||
      !description?.trim() ||
      !status?.trim() ||
      !dueDate?.trim()
    ) {
      return res.status(400).json({
        message:
          "Title, description, status and dueDate are required and cannot be empty",
      });
    }

    const update = { title, description, status, dueDate };
    if (priority && ["low", "medium", "high"].includes(String(priority))) {
      update.priority = priority;
    }

    const task = await Task.findByIdAndUpdate(req.params.id, update, {
      new: true,
    });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task updated", task });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating task", error: err.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task deleted" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting task", error: err.message });
  }
};
