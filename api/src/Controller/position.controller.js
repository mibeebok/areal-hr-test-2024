const pool = require("../db/db.client");

import {
  createPositionsSchema,
  getOnePositionsSchema,
  updatePositionsSchema,
} from "./dto/position.dto";

//Position
class PositionController {
  //CREATE
  async createPositions(req, res) {
    const { error } = createPositionsSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const client = await pool.connect();
    const { name } = req.body;
    try {
      await client.query("BEGIN");
      const new_position = await client.query(
        "INSERT INTO positions (name, create_at) values ($1, NOW()) RETURNING *",
        [name]
      );
      await client.query(
        "INSERT INTO history_of_change (date_and_time_of_the_operation, who_changed_it, the_object_of_operation, changed_fields, create_at) VALUES (NOW(), $1, $2, $3, NOW())"[
          (req.user.id, "Должность", JSON.stringify(result.rows[0]))
        ]
      );
      await client.query("COMMIT");
      res.status(201).json(new_position.rows[0]);
    } catch (err) {
      await client.query("ROLLBACK");
      res.status(500).json({ error: err.message });
    } finally {
      client.release();
    }
  }
  //GET
  async getPositions(req, res) {
    try {
      const positions = await pool.query(
        "SELECT * FROM positions WHERE delete_at = NULL"
      );
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
    const client = await pool.connect();
    const { id, name } = req.body;
    try {
      await client.query("BEGIN");
      const positions = await client.query(
        "UPDATE positions SET name = $1, update_at = NOW() WHERE id = $2 RETURNING *",
        [name, id]
      );
      await client.query(
        "INSERT INTO history_of_change (date_and_time_of_the_operation, who_changed_it, the_object_of_operation, changed_fields, update_at) VALUES (NOW(), $1, $2, $3, NOW())"[
          (req.user.id, "Должность", JSON.stringify(result.rows[0]))
        ]
      );
      await client.query("COMMIT");
      if (positions.rows.length > 0) {
        res.status(201).json(positions.rows);
      } else {
        res.status(404).json({ message: "Должность не найдена" });
      }
    } catch (err) {
      await client.query("ROLLBACK");
      res.status(500).json({ error: err.message });
    } finally {
      client.release();
    }
  }
  //DELETE
  async deletePositions(req, res) {
    const id = req.params.id;
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      const positions = await client.query(
        "UPDATE FROM positions SET delete_at = NOW() WHERE id = $1"[id]
      );
      await client.query(
        "INSERT INTO history_of_change (date_and_time_of_the_operation, who_changed_it, the_object_of_operation, changed_fields, delete_at) VALUES (NOW(), $1, $2, $3, NOW())"[
          (req.user.id, "Должность", JSON.stringify(result.rows[0]))
        ]
      );
      await client.query("COMMIT");
      if (positions.rows.length > 0) {
        res.status(201).json(positions.rows);
      } else {
        res.status(404).json({ message: "Должность не найдена" });
      }
    } catch (err) {
      await client.query("ROLLBACK");
      res.status(500).json({ error: err.message });
    } finally {
      client.release();
    }
  }
}

module.exports = new PositionController();
