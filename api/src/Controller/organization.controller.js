const pool = require("../db/db.client");

//Validate Organization
const Joi = require("joi");

const createOrganizationSchema = Joi.object({
  name: Joi.string().min(5).max(100).required(),
  comment: Joi.string().min(5).max(100).allow(""),
});
const getOneOrganizationSchema = Joi.object({
  id: Joi.number().integer().required(),
});
const updateOrganizationSchema = Joi.object({
  name: Joi.string().min(5).max(100).required(),
  comment: Joi.string().min(5).max(100).allow(""),
  id: Joi.number().integer().required(),
});

//Loging changes
/*
const logingChangesOrganization = `
CREATE OR REPLACE FUNCTION logingChangesOrganization()
RETURNS TRIGGER AS $$
DECLARE
  roles_caption TEXT;
BEGIN

    SELECT r.capton INTO roles_caption
    FROM roles r
    WHERE r.id = (SELECT id_roles FROM specialist)

    INSERT INTO history_of_change (date_and_time_of_the_operation, who_changed_it, the_object_of_operation, changed_fields, add_at)
    VALUES (
        NOW(),
        COALESCE(roles_caption, 'unknow'),
        'Organization',
        jsonb_build_object(
            'old', row_to_json(OLD),
            'new', row_to_json(NEW)
        ),
        NOW()
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
*/

//Organization
class OrganizationController {
  //CREATE
  async createOrganization(req, res) {
    const { error } = createOrganizationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const { name, comment, create_at } = req.body;
    try {
      const organizations = await pool.query(
        "INSERT INTO organizations (name, comment, create_at) values ($1, $2. NOW()) RETURNING *",
        [name, comment, create_at]
      );
      const organizationHistory = await pool.query(
        "INSERT INTO history_of_change (date_and_time_of_the_operation, who_changed_it, the_object_of_operation, changed_fields, create_at) VALUES (NOW(), $1, $2, $3, NOW())"[
          (req.user.id, "Организация", JSON.stringify(result.rows[0]))
        ]
      );

      /*
      await pool.query(logingChangesOrganization);
      await pool.query(logingChangesOrganizationTrigger);
      */

      res.json(organizations.rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  //GET
  async getOrganization(req, res) {
    try {
      const organizations = await pool.query("SELECT * FROM organizations");
      res.json(organizations.rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  //GET ONE
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
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  //UPDATE
  async updateOrganization(req, res) {
    const { error } = updateOrganizationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const { id, name, comment, update_at } = req.body;
    try {
      const organizations = await pool.query(
        "UPDATE organizations SET name = $1, comment = $2, update_at = NOW() WHERE id = $3 RETURNING *",
        [name, comment, update_at, id]
      );
      if (organizations.rows.length > 0) {
        res.json(organizations.rows[0]);
      } else {
        res.status(404).json({ message: "Организация не найдена" });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  //DELETE
  async deleteOrganization(req, res) {
    const id = req.params.id;
    try {
      const organizations = await pool.query(
        "UPDATE FROM organizations SET delete_at = NOW() WHERE id = $1"[id]
      );
      if (organizations.rows.length > 0) {
        res.json(organizations.rows[0]);
      } else {
        res.status(404).json({ message: "Организация не найдена" });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new OrganizationController();
