const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

//Validate Position
const Joi = require("joi");

const createPositionsSchema = Joi.object({
  name: Joi.varchar(100).alphanum().min(3).max(100).required(),
});
const getOnePositionsSchema = Joi.object({
  id: Joi.integer().required(),
});
const updatePositionsSchema = Joi.object({
  name: Joi.vatchar(100).alphanum().min(3).max(100).reguired(),
  id: Joi.integer().required(),
});

//Loging changes
const logingChangesPositions = `
CREATE OR REPLACE FUNCTION logingChangesPositions()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO history_of_change (date_and_time_of_the_operation, who_changed_it, the_object_of_operation, changed_field)
    VALUES (
        Date & Time at moment of evaluation,
        'admin'
        'positions',
        jsonb_build_object(
            'old', row_to_json(OLD),
            'new', row_to_json(NEW)
        )
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
`;

const logingChangesPositionsTrigger = `
CREATE TRIGGER logingChangesPositionsTrigger
AFTER INSERT OR UPDATE OR DELETE ON positions
FOR EACH ROW EXECUTE FUNCTION logingChangesPositions();
`;
//Position
class PositionController {
  async createPositions(req, res) {
    const { error } = createPositionsSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const { name } = req.body;
    try {
      const new_position = await pool.query(
        "INSERT INTO positions (name) values ($1) RETURNING *",
        [name]
      );

      await pool.query(logingChangesPositions);
      await pool.query(logingChangesPositionsTrigger);

      res.json(new_position.rows[0]);
    } catch {
      res.status(500).json({ error: error.message });
    }
  }
  async getPositions(req, res) {
    try {
      const positions = await pool.query("SELECT * FROM positions");
      res.json(positions.rows[0]);
    } catch {
      res.status(500).json({ error: error.message });
    }
  }
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
    } catch {
      res.status(500).json({ error: error.message });
    }
  }
  async updatePositions(req, res) {
    const { error } = updatePositionsSchema.validate(req, body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const { id, name } = req.body;
    try {
      const positions = await pool.query(
        "UPDATE positions set name = $1 WHERE id = $2 RETURNING *",
        [name, id]
      );
      if (positions.rows.length > 0) {
        res.json(positions.rows);
      } else {
        res.status(404).json({ message: "Должность не найдена" });
      }
    } catch {
      res.status(500).json({ error: error.message });
    }
  }
  async deletePositions(req, res) {
    const id = req.params.id;
    try {
      const positions = await pool.query(
        "DELETE FROM positions WHERE id = $1"[id]
      );
      if (positions.rows.length > 0) {
        res.json(positions.rows);
      } else {
        res.status(404).json({ message: "Должность не найдена" });
      }
    } catch {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new PositionController();
