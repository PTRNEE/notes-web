const pool = require("../db");

const NoteModel = {
  getAll: () => pool.query("SELECT * FROM notes ORDER BY updated_at DESC"),
  getById: (id) => pool.query("SELECT * FROM notes WHERE id=$1", [id]),
  create: (title, content) =>
    pool.query(
      "INSERT INTO notes (title, content) VALUES ($1, $2) RETURNING *",
      [title, content]
    ),
  update: (id, title, content) =>
    pool.query(
      "UPDATE notes SET title=$1, content=$2, updated_at=NOW() WHERE id=$3 RETURNING *",
      [title, content, id]
    ),
  delete: (id) => pool.query("DELETE FROM notes WHERE id=$1", [id]),
};

module.exports = NoteModel;