const { Pool } = require("pg");
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

//Validate Organization
const Joi = require("joi");

const createOrganizationSchema = Joi.object({
  name: Joi.varchar(100).alphanum().min(5).max(100).required(),
  comment: Joi.varchar(100).alphanum().min(5).max(100).required(),
});
const getOneOrganizationSchema = Joi.object({
  id: Joi.integer().required(),
});
const updateOrganizationSchema = Joi.object({
  name: Joi.varchar(100).alphanum().min(5).max(100).required(),
  comment: Joi.varchar(100).alphanum().min(5).max(100).required(),
  id: Joi.integer().required(),
});

//Organization
class OrganizationController {
  async createOrganization(req, res) {
    const { error } = createOrganizationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const { name, comment } = req.body;
    try {
      const organizations = await pool.query(
        "INSERT INTO organizations (name, comment) values ($1, $2) RETURNING *",
        [name, comment]
      );
      res.json(organizations.rows);
    } catch (err) {
      console.error(err);

      res.status(500).json({ error: error.message });
    }
  }
  async getOrganization(req, res) {
    try {
      const organizations = await pool.query("SELECT * FROM organizations");
      res.json(organizations.rows);
    } catch {
      res.status(500).json({ error: error.message });
    }
  }
  async getOneOrganization(req, res) {
    const { error } = getOneOrganizationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const id = req.params.id;
    try {
      const organizations = await pool.query(
        "SELECT * FROM organizations WHERE id = $1"[id]
      );
      if (organizations.rows.length > 0) {
        res.json(organizations.rows[0]);
      } else {
        res.status(404).json({ message: "Организация не найдена" });
      }
    } catch {
      res.status(500).json({ error: error.message });
    }
  }
  async updateOrganization(req, res) {
    const { error } = updateOrganizationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const { id, name, comment } = req.body;
    try {
      const organizations = await pool.query(
        "UPDATE organizations set name = $1 comment = $2 WHERE id = $3 RETURNING *",
        [name, comment, id]
      );
      if (organizations.rows.length > 0) {
        res.json(organizations.rows[0]);
      } else {
        res.status(404).json({ message: "Организация не найдена" });
      }
    } catch {
      res.status(500).json({ error: error.message });
    }
  }
  async deleteOrganization(req, res) {
    const id = req.params.id;
    try {
      const organizations = await pool.query(
        "DELETE FROM organizations WHERE id = $1"[id]
      );
      if (organizations.rows.length > 0) {
        res.json(organizations.rows[0]);
      } else {
        res.status(404).json({ message: "Организация не найдена" });
      }
    } catch {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new OrganizationController();
