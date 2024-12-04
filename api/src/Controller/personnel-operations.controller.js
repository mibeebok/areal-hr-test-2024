const pool = require("../db/db.client");

import {createPersonnelOperationsSchema, getOnePersonnelOperationsSchema, updatePersonnelOperationsSchema} from "./dto/personnel-operations.dto";

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
        ]
      );
      const operationHistory = await pool.query(
        "INSERT INTO history_of_change (date_and_time_of_the_operation, who_changed_it, the_object_of_operation, changed_fields, create_at) VALUES (NOW(), $1, $2, $3, NOW())"[
          (req.user.id, "Кадровые операции", JSON.stringify(result.rows[0]))
        ]
      );

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
