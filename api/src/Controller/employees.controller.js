const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
//Validate Employees
const Joi = require("joi");

const createEmployeesSchema = Joi.object({
  first_name: Joi.string().alphanum().min(5).max(100).required(),
  name: Joi.string().alphanum().min(3).max(100).required(),
  patronymic: Joi.string().alphanum().min(5).max(100).required(),
  date_of_birth: Joi.date().required(),
  id_passport_data: Joi.number().integer().required(),
  id_registration_address: Joi.number().integer().required(),
});
const getOneEmployeesSchema = Joi.object({
  id: Joi.number().integer().required(),
});
const updateEmployeesSchema = Joi.object({
  first_name: Joi.string().alphanum().min(5).max(100).required(),
  name: Joi.string().alphanum().min(3).max(100).required(),
  patronymic: Joi.string().alphanum().min(5).max(100).required(),
  date_of_birth: Joi.date().required(),
  id_passport_data: Joi.number().integer().required(),
  id_registration_address: Joi.number().integer().required(),
  id: Joi.number().integer().required(),
});

//Loging changes
const logingChangesEmployees = `
CREATE OR REPLACE FUNCTION logingChangesEmployees()
RETURNS TRIGGER AS $$
DECLARE
  roles_caption TEXT;
BEGIN
    SELECT r.capton INTO roles_caption
    FROM roles r
    WHERE r.id = (SELECT id_roles FROM specialist)

    INSERT INTO history_of_change (date_and_time_of_the_operation, who_changed_it, the_object_of_operation, changed_fields)
    VALUES (
        NOW(),
        COALESCE(roles_caption, 'unknow'),
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
  //CREATE
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
      passportData,
      registrationAddress
    } = req.body;
    try {

      const passportResult = await pool.query(
        "INSERT INTO passport_data (series, number, date_of_issue, unit_code, issued_by_whom) VALUES ($1, $2, $3, $4, $5) RETURNING id",
        [
          passportData.series,
          passportData.number,
          passportData.date_of_issue,
          passportData.unit_code,
          passportData.issued_by_whom,
        ]
      );
    
      // Получаем идентификатор новосозданного паспорта
      const id_passport_data = passportResult.rows[0].id;

      const addressResult = await pool.query(
        `INSERT INTO registration_adress (region, locality, street, house, building, apartament) 
         VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
        [
          registrationAddress.region,
          registrationAddress.locality,
          registrationAddress.street,
          registrationAddress.house,
          registrationAddress.building,
          registrationAddress.apartament,
        ]
      );
    
      // Получаем идентификатор новосозданного адреса
      const id_registration_address = addressResult.rows[0].id;

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
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  //GET
  async getEmployees(req, res) {
    try {
      const employees = await pool.query( `SELECT 
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
        r.apartament 
    FROM employees e
    LEFT JOIN passport_data p ON e.id_passport_data = p.id
    LEFT JOIN registration_address r ON e.id_registration_address = r.id`);
      res.json(employees.rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  //GET ONE
  async getOneEmployees(req, res) {
    const { error } = getOneEmployeesSchema.validate(req.body);
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
      r.apartament 
    FROM employees e
    LEFT JOIN passport_data p ON e.id_passport_data = p.id
    LEFT JOIN registration_address r ON e.id_registration_address = r.id
    WHERE e.id = $1`, 
    [id]
      );
      if (employees.rows.length > 0) {
        res.json(employees.rows);
      } else {
        res.status(404).json({ message: "Сотрудник не найден" });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  //UPDATE
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
      passport,
      address,
    } = req.body;
    const id = req.params.id; 
    const id_passport_data = passport.id; 
    const id_registration_address = address.id;
    try {
      await pool.query(
        `UPDATE passport_data 
         SET series = $1, number = $2, date_of_issue = $3, unit_code = $4, issued_by_whom = $5 
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

    await pool.query(
        `UPDATE registration_address 
         SET region = $1, locality = $2, street = $3, house = $4, building = $5, apartment = $6 
         WHERE id = $7`,
        [
            address.region,
            address.locality,
            address.street,
            address.house,
            address.building,
            address.apartment,
            id_registration_address,
        ]
    );
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
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  //DELETE
  async deleteEmployees(req, res) {
    const id = req.params.id;
    try {
      const employees = await pool.query(
        `DELETE 
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
      r.apartament 
      FROM employees e
      LEFT JOIN passport_data p ON e.id_passport_data = p.id
      LEFT JOIN registration_address r ON e.id_registration_address = r.id
      WHERE e.id = $1`, 
    [id]
      );
      if (employees.rows.length > 0) {
        res.json(employees.rows);
      } else {
        res.status(404).json({ message: "Сотрудник не найден" });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new EmployeesController();
