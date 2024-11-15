const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

//Validate Files
const Joi = require("joi");

const createFilesSchema = Joi.object({
  id_employees: Joi.integer().required(),
  name: Joi.string().alphamun().min(3).max(100).required(),
  files_path: Joi.string().alphanum().required(),
});
const getOneFilesSchema = Joi.object({
  id: Joi.integer().required(),
});
const updateFilesSchema = Joi.object({
  id_employees: Joi.integer().required(),
  name: Joi.string().alphamun().min(3).max(100).required(),
  files_path: Joi.string().alphanum().required(),
  id: Joi.integer().required(),
});

//Files
class FilesController {
  async createFiles(req, res) {
    const { error } = createFilesSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const { id_employees, name, file_parh } = req.body;
    try {
      const new_files = await pool.query(
        "INSERT INTO files (id_employees, name, file_parh) values ($1, $2, $3) RETURNING *",
        [id_employees, name, file_parh]
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
    const { error } = getOneFilesSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
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
    const { error } = updateFilesSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const { id, id_employees, name, file_parh } = req.body;
    try {
      const files = await pool.query(
        "UPDATE files set id_employees = $1 name = $2 file_parh = $3 WHERE id = $4 RETURNING *",
        [id_employees, name, file_parh, id]
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
