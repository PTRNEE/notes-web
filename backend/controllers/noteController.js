const NoteModel = require("../models/noteModel");

const noteController = {
  getAll: async (req, res) => {
    try {
      const { rows } = await NoteModel.getAll();
      res.json(rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  getById: async (req, res) => {
    try {
      const { rows } = await NoteModel.getById(req.params.id);
      if (!rows.length) return res.status(404).json({ error: "Not found" });
      res.json(rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  create: async (req, res) => {
    try {
      const { title, content } = req.body;
      if (!title) return res.status(400).json({ error: "Title required" });
      const { rows } = await NoteModel.create(title, content);
      res.status(201).json(rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  update: async (req, res) => {
    try {
      const { title, content } = req.body;
      const { rows } = await NoteModel.update(req.params.id, title, content);
      if (!rows.length) return res.status(404).json({ error: "Not found" });
      res.json(rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  delete: async (req, res) => {
    try {
      await NoteModel.delete(req.params.id);
      res.json({ message: "Deleted" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = noteController;