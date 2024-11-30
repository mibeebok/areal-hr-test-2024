const pool = require("../db/db.client");

//Validate Personnel operations
const Joi = require("joi");

const createPersonnelOperationsSchema = Joi.object({
  id_employee: Joi.number().integer().required(),
  id_department: Joi.number().integer().required(),
  id_position: Joi.number().integer().required(),
  setting_the_salary: Joi.number().integer().allow(""),
  salary_change: Joi.number().integer().allow(""),
  dismissal_from_work: Joi.boolean().required(),
});
const getOnePersonnelOperationsSchema = Joi.object({
  id: Joi.number().integer().required(),
});
const updatePersonnelOperationsSchema = Joi.object({
  id_employee: Joi.number().integer().required(),
  id_department: Joi.number().integer().required(),
  id_position: Joi.number().integer().required(),
  setting_the_salary: Joi.number().integer().allow(""),
  salary_change: Joi.number().integer().allow(""),
  dismissal_from_work: Joi.boolean().required(),
  id: Joi.number().integer().required(),
});

//Loging changes
/*
const logingChangesPersonnelOperation = `
CREATE OR REPLACE FUNCTION logingChangesPersonnelOperation()
RETURNS TRIGGER AS $$
DECLIARE
roles_caption TEXT
BEGIN

    SELECT r.caption INTO roles_caption
    FROM roles r
    WHERE r.id = (SELECT id_roles FROM specialist)

    INSERT INTO history_of_change (date_and_time_of_the_operation, who_changed_it, the_object_of_operation, changed_fields, create_at)
    VALUES (
        NOW(),
        COALESCE (roles_caption, 'unknow'),
        'personnel_operation',
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

const logingChangesPersonnelOperationTrigger = `
CREATE TRIGGER logingChangesPersonnelOperationTrigger
AFTER INSERT OR UPDATE OR DELETE ON personnel_operations
FOR EACH ROW EXECUTE FUNCTION logingChangesPersonnelOperation();
`;
*/

//Personnel operations
class PersonnelOperationsController {
  //CREATE
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
      create_at,
    } = req.body;
    try {
      const new_personnel_operations = await pool.query(
        "INSERT INTO personnel_operations (id_employee, id_department, id_position, setting_the_salary, salary_change, dismissal_from_work, create_at) values ($1, $2, $3, $4, $5, false, NOW()) RETURNING *",
        [
          id_employee,
          id_department,
          id_position,
          setting_the_salary,
          salary_change,
          dismissal_from_work,
          create_at,
        ]
      );
      const operationHistory = await pool.query(
        "INSERT INTO history_of_change (date_and_time_of_the_operation, who_changed_it, the_object_of_operation, changed_fields, create_at) VALUES (NOW(), $1, $2, $3, NOW())"[
          (req.user.id, "Кадровые операции", JSON.stringify(result.rows[0]))
        ]
      );

      /*
      await pool.query(logingChangesPersonnelOperation);
      await pool.query(logingChangesPersonnelOperationTrigger);
      */

      res.json(new_personnel_operations.rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  //GET
  async getPersonnelOperations(req, res) {
    try {
      const personnel_operations = await pool.query(
        "SELECT * FROM personnel_operations WHERE dismissal_from_work = false"
      );
      res.json(personnel_operations.rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  //GET ONE
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
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  //UPDATE
  async updatePersonnelOperations(req, res) {
    const { error } = updatePersonnelOperationsSchema.validate(req.body);
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
      update_at,
      id,
    } = req.body;
    try {
      const personnel_operations = await pool.query(
        "UPDATE personnel_operations SET id_employee = $1, id_department = $2, id_position =$3, setting_the_salary = $4, salary_change = $5, dismissal_from_work = $6, update_at = NOW() WHERE id = $7 RETURNING *",
        [
          id_employee,
          id_department,
          id_position,
          setting_the_salary,
          salary_change,
          dismissal_from_work,
          update_at,
          id,
        ]
      );
      if (personnel_operations.rows.length > 0) {
        res.json(personnel_operations.rows);
      } else {
        res.status(404).json({ message: "Опреация не найдена" });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  //DELETE
  async deletePersonnelOperations(req, res) {
    const id = req.params.id;
    try {
      const personnel_operations = await pool.query(
        "UPDATE FROM personnel_operations SET delete_at = NOW() WHERE id = $1"[
          id
        ]
      );
      if (personnel_operations.rows.length > 0) {
        res.json(personnel_operations.rows);
      } else {
        res.status(404).json({ message: "Опреация не найдена" });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  //DISMISSAL FROM WORK
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
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new PersonnelOperationsController();
