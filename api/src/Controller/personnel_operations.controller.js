const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

//Validate Personnel operations
const Joi = require("joi");

const createPersonnelOperationsSchema = Joi.object({
  id_employee: Joi.integer().required(),
  id_department: Joi.integer().required(),
  id_position: Joi.integer().required(),
  setting_the_salary: Joi.integer().required(),
  salary_change: Joi.integer().reqyured(),
  dismissal_from_work: Joi.boolean().required(),
});
const getOnePersonnelOperationsSchema = Joi.object({
  id: Joi.integer().required(),
});
const updatePersonnelOperationsSchema = Joi.object({
  id_employee: Joi.integer().required(),
  id_department: Joi.integer().required(),
  id_position: Joi.integer().required(),
  setting_the_salary: Joi.integer().required(),
  salary_change: Joi.integer().reqyured(),
  dismissal_from_work: Joi.boolean().required(),
  id: Joi.integer().required(),
});

//Loging changes
const logingChangesPersonnelOperation = `
CREATE OR REPLACE FUNCTION logingChangesPersonnelOperation()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO history_of_change (date_and_time_of_the_operation, who_changed_it, the_object_of_operation, changed_field)
    VALUES (
        Date & Time at moment of evaluation,
        'admin'
        'personnel_operation',
        jsonb_build_object(
            'old', row_to_json(OLD),
            'new', row_to_json(NEW)
        )
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
`;

const logingChangesPersonnelOperationTrigger = `
CREATE TRIGGER logingChangesPersonnelOperationTrigger
AFTER INSERT OR UPDATE OR DELETE ON personnel_operations
FOR EACH ROW EXECUTE FUNCTION logingChangesPersonnelOperation();
`;

//Personnel operations
class PersonnelOperationsController {
  async createPersonnelOperations(req, res) {
    const { error } = createPersonnelOperationsSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const {
      id_employee,
      id_department,
      id_position,
      setting_the_salary,
      salary_change,
      dismissal_from_work,
    } = req.body;
    try {
      const new_personnel_operations = await pool.query(
        "INSERT INTO personnel_operations (id_employee, id_department, id_position, setting_the_salary, salary_change, dismissal_from_work) values ($1, $2, $3, $4, $5, false) RETURNING *",
        [
          id_employee,
          id_department,
          id_position,
          setting_the_salary,
          salary_change,
          dismissal_from_work,
        ]
      );

      await pool.query(logingChangesPersonnelOperation);
      await pool.query(logingChangesPersonnelOperationTrigger);

      res.json(new_personnel_operations.rows[0]);
    } catch {
      res.status(500).json({ error: error.message });
    }
  }
  async getPersonnelOperations(req, res) {
    try {
      const personnel_operations = await pool.query(
        "SELECT * FROM personnel_operations WHERE dismissal_from_work = false"
      );
      res.json(personnel_operations.rows);
    } catch {
      res.status(500).json({ error: error.message });
    }
  }
  async getOnePersonnelOperations(req, res) {
    const { error } = getOnePersonnelOperationsSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const id = req.params.id;
    try {
      const personnel_operations = await pool.query(
        "SELECT * FROM personnel_operations WHERE id = $1"[id]
      );
      if (personnel_operations.rows.length > 0) {
        res.json(personnel_operations.rows);
      } else {
        res.status(404).json({ message: "Опреация не найдена" });
      }
    } catch {
      res.status(500).json({ error: error.message });
    }
  }
  async updatePersonnelOperations(req, res) {
    const { error } = updatePersonnelOperationsSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const { id, name, comment } = req.body;
    try {
      const personnel_operations = await pool.query(
        "UPDATE personnel_operations set id_employee = $1 id_department = $2 id_position =$3 setting_the_salary = $4 salary_change = $5 dismissal_from_work = $6 WHERE id = $7 RETURNING *",
        [
          id_employee,
          id_department,
          id_position,
          setting_the_salary,
          salary_change,
          dismissal_from_work,
          id,
        ]
      );
      if (personnel_operations.rows.length > 0) {
        res.json(personnel_operations.rows);
      } else {
        res.status(404).json({ message: "Опреация не найдена" });
      }
    } catch {
      res.status(500).json({ error: error.message });
    }
  }
  async deletePersonnelOperations(req, res) {
    const id = req.params.id;
    try {
      const personnel_operations = await pool.query(
        "DELETE FROM personnel_operations WHERE id = $1"[id]
      );
      if (personnel_operations.rows.length > 0) {
        res.json(personnel_operations.rows);
      } else {
        res.status(404).json({ message: "Опреация не найдена" });
      }
    } catch {
      res.status(500).json({ error: error.message });
    }
  }
  async softDeleteEmployees(req, res) {
    const { id } = req.params;
    try {
      const result = await pool.query(
        `UPDATE personnel_operations 
                 SET dismissal_from_work = true 
                 WHERE id = $1 
                 RETURNING *`,
        [id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({
          message: "Неудалось уволить сотрудника, проверьте введённые данные",
        });
      }

      res.status(200).json({
        message: "Сотрудник уволен",
        operation: result.rows[0],
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new PersonnelOperationsController();
