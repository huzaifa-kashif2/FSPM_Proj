import Note from "../models/Note.js";

export const createNote = async (req, res) => {
  try {
    const { title, content, tags, userId } = req.body;

    if (
      !title?.trim() ||
      !content?.trim() ||
      !userId?.trim() ||
      !tags ||
      (Array.isArray(tags) && tags.length === 0)
    ) {
      return res.status(400).json({
        message:
          "Title, content, tags and userId are required and cannot be empty",
      });
    }

    const note = new Note({ title, content, tags, user: userId });
    await note.save();
    res.status(201).json(note);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to create note", error: err.message });
  }
};

export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find().populate("user", "email");
    res.json(notes);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch notes", error: err.message });
  }
};

export const getNotesByUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const notes = await Note.find({ user: userId }).populate("user", "email");
    res.json(notes);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch user notes", error: error.message });
    console.log("Error fetching user notes:", error);
  }
};

export const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id).populate("user", "email");
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.json(note);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch note", error: err.message });
  }
};

export const updateNote = async (req, res) => {
  try {
    const { title, content, tags } = req.body;

    if (
      !title?.trim() ||
      !content?.trim() ||
      !tags ||
      (Array.isArray(tags) && tags.length === 0)
    ) {
      return res.status(400).json({
        message: "Title, content and tags are required and cannot be empty",
      });
    }

    const note = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content, tags },
      { new: true }
    );

    if (!note) return res.status(404).json({ message: "Note not found" });
    res.json(note);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update note", error: err.message });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.json({ message: "Note deleted" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete note", error: err.message });
  }
};
