const pool = require("../db/db.client");

import {createPositionsSchema, getOnePositionsSchema, updatePositionsSchema} from "./dto/position.dto"; 

//Position
class PositionController {
  //CREATEA
  async createPositions(req, res) {
    const { error } = createPositionsSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const { name } = req.body;
    try {
      const new_position = await pool.query(
        "INSERT INTO positions (name, create_at) values ($1, NOW()) RETURNING *",
        [name]
      );
      const positionHistory = await pool.query(
        "INSERT INTO history_of_change (date_and_time_of_the_operation, who_changed_it, the_object_of_operation, changed_fields, create_at) VALUES (NOW(), $1, $2, $3, NOW())"[
          (req.user.id, "Должность", JSON.stringify(result.rows[0]))
        ]
      );
      res.json(new_position.rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  //GET
  async getPositions(req, res) {
    try {
      const positions = await pool.query("SELECT * FROM positions");
      res.json(positions.rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  //GET ONE
  async getOnePositions(req, res) {
    const { error } = getOnePositionsSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const id = req.params.id;
    try {
      const positions = await pool.query(
        "SELECT * FROM positions WHERE id = $1"[id]
      );
      if (positions.rows.length > 0) {
        res.json(positions.rows);
      } else {
        res.status(404).json({ message: "Должность не найдена" });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  //UPDATE
  async updatePositions(req, res) {
    const { error } = updatePositionsSchema.validate(req, body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const { id, name } = req.body;
    try {
      const positions = await pool.query(
        "UPDATE positions SET name = $1, update_at = NOW() WHERE id = $2 RETURNING *",
        [name, id]
      );
      if (positions.rows.length > 0) {
        res.json(positions.rows);
      } else {
        res.status(404).json({ message: "Должность не найдена" });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  //DELETE
  async deletePositions(req, res) {
    const id = req.params.id;
    try {
      const positions = await pool.query(
        "UPDATE FROM positions SET delete_at = NOW() WHERE id = $1"[id]
      );
      if (positions.rows.length > 0) {
        res.json(positions.rows);
      } else {
        res.status(404).json({ message: "Должность не найдена" });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new PositionController();
