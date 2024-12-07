const pool = require("../db/db.client");

const {
  createOrganizationSchema,
  getOneOrganizationSchema,
  updateOrganizationSchema,
} = require("./dto/organization.dto.js");

//Organization
class OrganizationController {
  //CREATE
  async createOrganization(req, res) {
    const { error } = createOrganizationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const client = await pool.connect();
    const { name, comment } = req.body;
    try {
      await client.query("BEGIN");
      const result = await client.query(
        "INSERT INTO organizations (name, comment, create_at) VALUES ($1, $2, NOW()) RETURNING*",
        [name, comment]
      );
      await client.query(
        "INSERT INTO history_of_change (date_and_time_of_the_operation, who_change_it, the_object_of_operation, changed_fields, create_at) VALUES (NOW(), $1, $2, $3, NOW())",
        [req.user.id, "Организация", JSON.stringify(result.rows[0])]
      );
      await client.query("COMMIT");
      res.status(201).json(result.rows[0]);
    } catch (err) {
      await client.query("ROLLBACK");
      res.status(500).json({ error: err.message });
    } finally {
      client.release();
    }
  }
  //GET
  async getOrganization(req, res) {
    try {
      const organizations = await pool.query(
        "SELECT * FROM organizations WHERE deleted_at is NULL"
      );
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
        "SELECT * FROM organizations WHERE id = $1",
        [id]
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
    const { id } = req.params;
    const { error } = updateOrganizationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const client = await pool.connect();
    const { name, comment } = req.body;
    try {
      await client.query("BEGIN");
      const organizations = await client.query(
        "UPDATE organizations SET name = $1, comment = $2, update_at = NOW() WHERE id = $3 RETURNING *",
        [name, comment, id]
      );
      if (organizations.rowCount === 0) {
        return res.status(404).json({ message: "Организация не найдена" });
      }

      await client.query(
        "INSERT INTO history_of_change (date_and_time_of_the_operation, who_change_it, the_object_of_operation, changed_fields, update_at) VALUES (NOW(),$1, $2, $3, NOW())",
        [req.user.id, "Организация", JSON.stringify(organizations.rows[0])]
      );
      await client.query("COMMIT");
    } catch (err) {
      await client.query("ROLLBACK");
      res.status(500).json({ error: err.message });
    } finally {
      client.release();
    }
  }
  //DELETE
  async deleteOrganization(req, res) {
    const id = req.params.id;
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      const organizations = await client.query(
        "UPDATE organizations SET deleted_at = NOW() WHERE id = $1",[id]
      );
      if (organizations.rowCount === 0) {
        return res.status(404).json({ message: "Организация не найдена" });
      }

      await client.query(
        "INSERT INTO history_of_change (date_and_time_of_the_operation, who_change_it, the_object_of_operation, changed_fields, deleted_at) VALUES (NOW(), $1, $2, $3, NOW())",
        [req.user.id, "Организация", JSON.stringify(organizations.rows[0])]
      );
      await client.query("COMMIT");
    } catch (err) {
      await client.query("ROLLBACK");
      res.status(500).json({ error: err.message });
    } finally {
      client.release();
    }
  }
}

module.exports = new OrganizationController();
