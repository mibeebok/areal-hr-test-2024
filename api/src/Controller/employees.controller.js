const pool = require("../db/db.client");

const {
  createEmployeesSchema,
  getOneEmployeesSchema,
  updateEmployeesSchema,
} = require("./dto/employees.dto");

//Employees
class EmployeesController {
  //CREATE
  async createEmployees(req, res) {
    const { error } = createEmployeesSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const client = await pool.connect();
    const {
      first_name,
      name,
      patronymic,
      date_of_birth,
      passportData,
      registrationAdress,
      file_path,
    } = req.body;
    try {
      await client.query("BEGIN");
      const passportResult = await client.query(
        "INSERT INTO passport_data (series, number, date_of_issue, unit_code, issued_by_whom, create_at) VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING id",
        [
          passportData.series,
          passportData.number,
          passportData.date_of_issue,
          passportData.unit_code,
          passportData.issued_by_whom,
        ]
      );

      const id_passport_data = passportResult.rows[0].id;

      const adressResult = await client.query(
        `INSERT INTO registration_adress (region, locality, street, house, building, apartament, create_at) 
         VALUES ($1, $2, $3, $4, $5, $6, NOW()) RETURNING id`,
        [
          registrationAdress.region,
          registrationAdress.locality,
          registrationAdress.street,
          registrationAdress.house,
          registrationAdress.building,
          registrationAdress.apartament,
        ]
      );

      const id_registration_adress = adressResult.rows[0].id;

      const new_employees = await client.query(
        "INSERT INTO employees (first_name, name, patronymic, date_of_birth, id_passport_data, id_registration_adress, create_at) values ($1, $2, $3, $4, $5, $6, $7, NOW()) RETURNING id",
        [
          first_name,
          name,
          patronymic,
          date_of_birth,
          id_passport_data,
          id_registration_adress,
        ]
      );

      const id_employees = new_employees.rows[0].id;

      if (file_path) {
        await client.query(
          `INSERT INTO files (id_employees, name, file_path)
          VALUES ($1, $2, $3)`,
          [id_employees, name, file_path]
        );
      }

      await client.query("COMMIT");
      res.status(201).json(new_employees.rows[0]);
    } catch (err) {
      await client.query("ROLLBACK");
      res.status(500).json({ error: err.message });
    } finally {
      client.release();
    }
  }
  //GET
  async getEmployees(req, res) {
    try {
      const employees = await pool.query(`
        SELECT 
          e.*, 
          p.series, 
          p.number, 
          p.date_of_issue, 
          p.unit_code, 
          p.issued_by_whom, 
          r.region, 
          r.locality, 
          r.street, 
          r.house, 
          r.building, 
          r.apartament,
          f.*  
        FROM employees e
        LEFT JOIN passport_data p ON e.id_passport_data = p.id
        LEFT JOIN registration_adress r ON e.id_registration_adress = r.id 
        LEFT JOIN files f ON e.id = f.id_employees  
        WHERE e.deleted_at IS NULL
      `);
      res.json(employees.rows);
    } catch (err) {
      console.error('Error fetching employees:', err);
      res.status(500).json({ error: err.message });
    }
  }
  //GET ONE
  async getOneEmployees(req, res) {
    const { error } = getOneEmployeesSchema.validate(req.params);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const id = req.params.id;
    try {
      const employees = await pool.query(
        `SELECT 
                e.*, 
                p.series, 
                p.number, 
                p.date_of_issue, 
                p.unit_code, 
                p.issued_by_whom, 
                r.region, 
                r.locality, 
                r.street, 
                r.house, 
                r.building, 
                r.apartament,
                f.*  
            FROM employees e
            LEFT JOIN passport_data p ON e.id_passport_data = p.id
            LEFT JOIN registration_adress r ON e.id_registration_address = r.id
            LEFT JOIN files f ON e.id = f.id_employees  
            WHERE e.id = $1`,
        [id]
      );

      if (employees.rows.length > 0) {
        res.json(employees.rows[0]);
      } else {
        res.status(404).json({ message: "Сотрудник не найден" });
      }
    } catch (err) {
      res
        .status(500)
        .json({
          error: "Произошла ошибка при получении данных: " + err.message,
        });
    }
  }
  //UPDATE
  async updateEmployees(req, res) {
    const { error } = updateEmployeesSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const client = await pool.connect();
    const { first_name, name, patronymic, date_of_birth, passport, adress } =
      req.body;
    const id = req.params.id;
    const id_passport_data = passport.id;
    const id_registration_adress = adress.id;
    let oldVersion;

    try {
      await client.query("BEGIN");

      const result = await client.query(
        "SELECT * FROM employees WHERE id = $1",
        [id]
      );
      if (result.rowCount === 0) {
        return res.status(404).json({ message: "Сотрудник не найден" });
      }
      oldVersion = result.rows[0];

      await client.query(
        `UPDATE passport_data 
         SET series = $1, number = $2, date_of_issue = $3, unit_code = $4, issued_by_whom = $5, update_at = NOW()
         WHERE id = $6`,
        [
          passport.series,
          passport.number,
          passport.date_of_issue,
          passport.unit_code,
          passport.issued_by_whom,
          id_passport_data,
        ]
      );

      await client.query(
        `UPDATE registration_adress 
         SET region = $1, locality = $2, street = $3, house = $4, building = $5, apartament = $6, update_at = NOW()
         WHERE id = $7`,
        [
          adress.region,
          adress.locality,
          adress.street,
          adress.house,
          adress.building,
          adress.apartament,
          id_registration_adress,
        ]
      );

      const employeesResult = await client.query(
        "UPDATE employees SET first_name = $1, name = $2, patronymic = $3, date_of_birth = $4, id_passport_data = $5, id_registration_adress = $6, update_at = NOW() WHERE id = $7 RETURNING *",
        [
          first_name,
          name,
          patronymic,
          date_of_birth,
          id_passport_data,
          id_registration_adress,
          id,
        ]
      );

      if (employeesResult.rowCount === 0) {
        return res.status(404).json({ message: "Сотрудник не найден" });
      }

      const newEmployees = employeesResult.rows[0];

      const file_path = req.body.file_path;
      await client.query(
        "UPDATE files SET id_employees = $1, name = $2, file_path = $3 WHERE id = $4",
        [newEmployees.id, name, file_path, id]
      );

      await client.query(
        "INSERT INTO history_of_change (date_and_time_of_the_operation, who_changed_it, the_object_of_operation, changed_fields, old_version, update_at) VALUES (NOW(), $1, $2, $3, $4, NOW())",
        [
          req.user.specialistId,
          "Сотрудники",
          JSON.stringify(newEmployees),
          JSON.stringify(oldVersion),
        ]
      );

      await client.query("COMMIT");
      res.status(200).json({ employee: newEmployees });
    } catch (err) {
      await client.query("ROLLBACK");
      res.status(500).json({ error: err.message });
    } finally {
      client.release();
    }
  }
  //DELETE
  async deleteEmployees(req, res) {
    const id = req.params.id;
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      await client.query(
        `UPDATE files SET deleted_at = NOW() WHERE id_employees = $1`,
        [id]
      );

      const employeesResult = await client.query(
        `UPDATE employees SET deleted_at = NOW() WHERE id = $1`,
        [id]
      );

      if (employeesResult.rowCount === 0) {
        return res.status(404).json({ message: "Сотрудник не найден" });
      }

      const passportResult = await client.query(
        `SELECT id_passport_data FROM employees WHERE id = $1`,
        [id]
      );

      const id_passport_data = passportResult.rows[0]?.id_passport_data;

      const registrationResult = await client.query(
        `SELECT id_registration_adress FROM employees WHERE id = $1`,
        [id]
      );

      const id_registration_adress =
        registrationResult.rows[0]?.id_registration_adress;

      if (id_passport_data) {
        await client.query(
          `UPDATE passport_data SET deleted_at = NOW() WHERE id = $1`,
          [id_passport_data]
        );
      }

      if (id_registration_adress) {
        await client.query(
          `UPDATE registration_adress SET deleted_at = NOW() WHERE id = $1`,
          [id_registration_adress]
        );
      }

      await client.query("COMMIT");
      res.status(200).json({ message: "Сотрудник удален" });
    } catch (err) {
      await client.query("ROLLBACK");
      res.status(500).json({ error: err.message });
    } finally {
      client.release();
    }
  }
}

module.exports = new EmployeesController();
