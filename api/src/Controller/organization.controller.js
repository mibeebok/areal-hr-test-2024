const { Pool } = require("pg");
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

//Validate Organization
const Joi = require("joi");

const createOrganizationSchema = Joi.object({
  name: Joi.string().min(5).max(100).required(),
  comment: Joi.string().min(5).max(100).allow(''),
});
const getOneOrganizationSchema = Joi.object({
  id: Joi.number().integer().required(),
});
const updateOrganizationSchema = Joi.object({
  name: Joi.string().min(5).max(100).required(),
  comment: Joi.string().min(5).max(100).allow(''),
  id: Joi.number().integer().required(),
});

//Loging changes
const logingChangesOrganization = `
CREATE OR REPLACE FUNCTION logingChangesOrganization()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO history_of_change (date_and_time_of_the_operation, who_changed_it, the_object_of_operation, changed_fields)
    VALUES (
        NOW(),
        'admin'
        'Organization',
        jsonb_build_object(
            'old', row_to_json(OLD),
            'new', row_to_json(NEW)
        )
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
`;

const logingChangesOrganizationTrigger = `
CREATE TRIGGER logingChangesOrganizationTrigger
AFTER INSERT OR UPDATE OR DELETE ON organizations
FOR EACH ROW EXECUTE FUNCTION logingChangesOrganization();
`;

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

      await pool.query(logingChangesOrganization);
      await pool.query(logingChangesOrganizationTrigger);

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
