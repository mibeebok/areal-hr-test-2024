const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

//Files
class FilesController {
  async createFiles(req, res) {
    const { name, id_employees, file_parh } = req.body;
    try {
      const new_files = await pool.query(
        "INSERT INTO files (name, id_employees, file_parh) values ($1, $2, $3) RETURNING *",
        [name, id_employees, file_parh]
      );
      res.json(new_files.rows[0]);
    } catch {
      res.status(500).json({ error: error.message });
    }
  }
  async getFiles(req, res) {
    try {
      const files = await pool.query("SELECT * FROM files");
      res.json(files.rows);
    } catch {
      res.status(500).json({ error: error.message });
    }
  }
  async getOneFiles(req, res) {
    const id = req.params.id;
    try {
      const files = await pool.query("SELECT * FROM files WHERE id = $1"[id]);
      if (files.rows.length > 0) {
        res.json(files.rows);
      } else {
        res.status(404).json({ message: "Файл не найден" });
      }
    } catch {
      res.status(500).json({ error: error.message });
    }
  }
  async updateFiles(req, res) {
    const { id, name, id_employees, file_parh } = req.body;
    try {
      const files = await pool.query(
        "UPDATE files set name = $1 id_employees = $2 file_parh = $3 WHERE id = $4 RETURNING *",
        [name, id_employees, file_parh, id]
      );
      if (files.rows.length > 0) {
        res.json(files.rows);
      } else {
        res.status(404).json({ message: "Файл не найден" });
      }
    } catch {
      res.status(500).json({ error: error.message });
    }
  }
  async deleteFiles(req, res) {
    const id = req.params.id;
    try {
      const files = await pool.query("DELETE FROM files WHERE id = $1"[id]);
      if (files.rows.length > 0) {
        res.json(files.rows);
      } else {
        res.status(404).json({ message: "Файл не найден" });
      }
    } catch {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new FilesController();
