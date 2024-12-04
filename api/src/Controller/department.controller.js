const pool = require("../db/db.client");

import { createDepartmentSchema, getOneDepartmentsSchema, updateDepartmentSchema } from "./dto/daperment.dto";

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
        "INSERT INTO departments (id_organization, parent, name, comment, create_at) values ($1, $2, $3, $4, NOW()) RETURNING *",
        [id_organization, parent, name, comment]
      );
      const departmentHistory = await pool.query(
        "INSERT INTO history_of_change (date_and_time_of_the_operation, who_changed_it, the_object_of_operation, changed_fields, create_at) VALUES (NOW(), $1, $2, $3, NOW())"[
          (req.user.id, "Отдел", JSON.stringify(result.rows[0]))
        ]
      );

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
    const { id_organization, name, parent, comment,  id } = req.body;
    try {
      const departments = await pool.query(
        "UPDATE departments SET id_organization = $1, parent = $2, name = $3, comment = $4, update_at = NOW() WHERE id = $5 RETURNING *",
        [id_organization, parent, name, comment,  id]
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
        "UPDATE FROM departments SET delete_at = NOW() WHERE id = $1"[id]
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
