const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

//Validate Department
const Joi = require("joi");

const createDepartmentSchema = Joi.object({
  id_organization: Joi.number().integer().required(),
  parent: Joi.number().integer().required(),
  name: Joi.string().min(3).max(30).required(),
  comment: Joi.string().min(5).max(1000).allow(""),
});
const getOneDepartmentsSchema = Joi.object({
  id: Joi.number().integer().required(),
});
const updateDepartmentSchema = Joi.object({
  id_organization: Joi.number().integer().required(),
  parent: Joi.number().integer().required(),
  name: Joi.string().min(3).max(30).required(),
  comment: Joi.string().min(5).max(1000).allow(""),
  id: Joi.number().integer().required(),
});

//Loging changes
const logingChangesDepartment = `
CREATE OR REPLACE FUNCTION logingChangesDepartment()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO history_of_change (date_and_time_of_the_operation, who_changed_it, the_object_of_operation, changed_fields)
    VALUES (
        NOW(),
        'admin'
        'Department',
        jsonb_build_object(
            'old', row_to_json(OLD),
            'new', row_to_json(NEW)
        )
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
`;

const logingChangesDepartmentTrigger = `
CREATE TRIGGER logingChangesDepartmentTrigger
AFTER INSERT OR UPDATE OR DELETE ON departments
FOR EACH ROW EXECUTE FUNCTION logingChangesDepartment();
`;

//Department
class DepartmentController {
  //CREATE
  async createDepartments(req, res) {
    const { error } = createDepartmentSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const { id_organization, parent, name, comment } = req.body;
    try {
      const departments = await pool.query(
        "INSERT INTO departments (id_organization, parent, name, comment) values ($1, $2, $3, $4) RETURNING *",
        [id_organization, parent, name, comment]
      );

      await pool.query(logingChangesDepartment);
      await pool.query(logingChangesDepartmentTrigger);

      res.json(departments.rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  //GET
  async getDepartments(req, res) {
    try {
      const departments = await pool.query("SELECT * FROM departments");
      res.json(departments.rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  //GET ONE
  async getOneDepartments(req, res) {
    const { error } = getOneDepartmentsSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const id = req.params.id;
    try {
      const departments = await pool.query(
        "SELECT * FROM departments WHERE id = $1"[id]
      );
      if (departments.rows.length > 0) {
        res.json(departments.rows[0]);
      } else {
        res.status(404).json({ message: "Отдел не найден" });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  //UPDATE
  async updateDepartments(req, res) {
    const { error } = updateDepartmentSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const { id_organization, name, parent, comment, id } = req.body;
    try {
      const departments = await pool.query(
        "UPDATE departments set id_organization = $1 parent = $2 name = $3 comment = $4 WHERE id = $5 RETURNING *",
        [id_organization, parent, name, comment, id]
      );
      if (departments.rows.length > 0) {
        res.json(departments.rows[0]);
      } else {
        res.status(404).json({ message: "Отдел не найден" });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  //DELETE
  async deleteDepartments(req, res) {
    const id = req.params.id;
    try {
      const departments = await pool.query(
        "DELETE FROM departments WHERE id = $1"[id]
      );
      if (departments.rows.length > 0) {
        res.json(departments.rows[0]);
      } else {
        res.status(404).json({ message: "Отдел не найден" });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new DepartmentController();
