const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

//Employees
class EmployeesController {
  async createEmployees(req, res) {
    const {
      first_name,
      name,
      patronymic,
      date_of_birth,
      id_passport_data,
      id_registration_address,
      id_scan,
    } = req.body;
    try {
      const new_employees = await pool.query(
        "INSERT INTO employees (first_name, name, patronymic, date_of_birth, id_passport_data, id_registration_address, id_scan) values ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
        [
          first_name,
          name,
          patronymic,
          date_of_birth,
          id_passport_data,
          id_registration_address,
          id_scan,
        ]
      );
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
    const { id, name, comment } = req.body;
    try {
      const employees = await pool.query(
        "UPDATE employees set first_name = $1 name = $2 patronymic = $3 date_of_birth = $4 id_passport_data = $5 id_registration_address = $6 id_scan = $7 WHERE id = $8 RETURNING *",
        [
          first_name,
          name,
          patronymic,
          date_of_birth,
          id_passport_data,
          id_registration_address,
          id_scan,
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
