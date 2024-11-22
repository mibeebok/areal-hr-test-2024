const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

//Validate Files
const Joi = require("joi");

const createFilesSchema = Joi.object({
  id_employees: Joi.number().integer().required(),
  name: Joi.string().alphanum().min(3).max(100).required(),
  files_path: Joi.string().required(),
});
const getOneFilesSchema = Joi.object({
  id: Joi.number().integer().required(),
});
const updateFilesSchema = Joi.object({
  id_employees: Joi.number().integer().required(),
  name: Joi.string().alphanum().min(3).max(100).required(),
  files_path: Joi.string().required(),
  id: Joi.number().integer().required(),
});

//Files
class FilesController {
  //CREATE
  async createFiles(req, res) {
    const { error } = createFilesSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const { id_employees, name, file_parh } = req.body;
    try {
      const new_files = await pool.query(
        "INSERT INTO files (id_employees, name, file_parh, add_at) values ($1, $2, $3, NOW()) RETURNING *",
        [id_employees, name, file_parh]
      );
      res.json(new_files.rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  //GET
  async getFiles(req, res) {
    try {
      const files = await pool.query("SELECT * FROM files");
      res.json(files.rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  //GET ONE
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
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  //UPDATE
  async updateFiles(req, res) {
    const { error } = updateFilesSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const { id, id_employees, name, file_parh } = req.body;
    try {
      const files = await pool.query(
        "UPDATE files SET id_employees = $1, name = $2, file_parh = $3, update_at = NOW() WHERE id = $4 RETURNING *",
        [id_employees, name, file_parh, id]
      );
      if (files.rows.length > 0) {
        res.json(files.rows);
      } else {
        res.status(404).json({ message: "Файл не найден" });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  //DELETE
  async deleteFiles(req, res) {
    const id = req.params.id;
    try {
      const files = await pool.query(
        "UPDATE FROM files SET delete_at = NOW() WHERE id = $1"[id]
      );
      if (files.rows.length > 0) {
        res.json(files.rows);
      } else {
        res.status(404).json({ message: "Файл не найден" });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new FilesController();
