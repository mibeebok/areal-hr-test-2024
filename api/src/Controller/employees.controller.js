const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
//Validate Employees
const Joi = require("joi");

const createEmployeesSchema = Joi.object({
  first_name: Joi.varchar(100).alphanum().min(5).max(100).required(),
  name: Joi.varchar(100).alphanum().min(3).max(100).required(),
  patronymic: Joi.varchar(100).alphanum().min(5).max(100).required(),
  date_of_birth: Joi.date().date().required(),
  id_passport_data: Joi.integer().required(),
  id_registration_address: Joi.integer().required(),
});
const getOneEmployeesSchema = Joi.object({
  id: Joi.integer().required(),
});
const updateEmployeesSchema = Joi.object({
  first_name: Joi.varchar(100).alphanum().min(5).max(100).required(),
  name: Joi.varchar(100).alphanum().min(3).max(100).required(),
  patronymic: Joi.varchar(100).alphanum().min(5).max(100).required(),
  date_of_birth: Joi.date().date().required(),
  id_passport_data: Joi.integer().required(),
  id_registration_address: Joi.integer().required(),
  id: Joi.integer().required(),
});

//Loging changes
const logingChangesEmployees = `
CREATE OR REPLACE FUNCTION logingChangesEmployees()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO history_of_change (date_and_time_of_the_operation, who_changed_it, the_object_of_operation, changed_field)
    VALUES (
        Date & Time at moment of evaluation,
        'admin'
        'Employees',
        jsonb_build_object(
            'old', row_to_json(OLD),
            'new', row_to_json(NEW)
        )
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
`;

const logingChangesEmployeesTrigger = `
CREATE TRIGGER logingChangesEmployeesTrigger
AFTER INSERT OR UPDATE OR DELETE ON employees
FOR EACH ROW EXECUTE FUNCTION logingChangesEmployees();
`;

//Employees
class EmployeesController {
  async createEmployees(req, res) {
    const { error } = createEmployeesSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const {
      first_name,
      name,
      patronymic,
      date_of_birth,
      id_passport_data,
      id_registration_address,
    } = req.body;
    try {
      const new_employees = await pool.query(
        "INSERT INTO employees (first_name, name, patronymic, date_of_birth, id_passport_data, id_registration_address) values ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
        [
          first_name,
          name,
          patronymic,
          date_of_birth,
          id_passport_data,
          id_registration_address,
        ]
      );

      await pool.query(logingChangesEmployees);
      await pool.query(logingChangesEmployeesTrigger);

      res.json(new_employees.rows[0]);
    } catch {
      res.status(500).json({ error: error.message });
    }
  }
  async getEmployees(req, res) {
    try {
      const employees = await pool.query("SELECT * FROM employees");
      res.json(employees.rows);
    } catch {
      res.status(500).json({ error: error.message });
    }
  }
  async getOneEmployees(req, res) {
    const { error } = getOneEmployeesSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const id = req.params.id;
    try {
      const employees = await pool.query(
        "SELECT * FROM employees WHERE id = $1"[id]
      );
      if (employees.rows.length > 0) {
        res.json(employees.rows);
      } else {
        res.status(404).json({ message: "Сотрудник не найден" });
      }
    } catch {
      res.status(500).json({ error: error.message });
    }
  }
  async updateEmployees(req, res) {
    const { error } = updateEmployeesSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const {
      first_name,
      name,
      patronymic,
      date_of_birth,
      id_passport_data,
      id_registration_address,
      id,
    } = req.body;
    try {
      const employees = await pool.query(
        "UPDATE employees set first_name = $1 name = $2 patronymic = $3 date_of_birth = $4 id_passport_data = $5 id_registration_address = $6 WHERE id = $7 RETURNING *",
        [
          first_name,
          name,
          patronymic,
          date_of_birth,
          id_passport_data,
          id_registration_address,
          id,
        ]
      );
      if (employees.rows.length > 0) {
        res.json(employees.rows);
      } else {
        res.status(404).json({ message: "Сотрудник не найден" });
      }
    } catch {
      res.status(500).json({ error: error.message });
    }
  }
  async deleteEmployees(req, res) {
    const id = req.params.id;
    try {
      const employees = await pool.query(
        "DELETE FROM employees WHERE id = $1"[id]
      );
      if (employees.rows.length > 0) {
        res.json(employees.rows);
      } else {
        res.status(404).json({ message: "Сотрудник не найден" });
      }
    } catch {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new EmployeesController();
