const pool = require('../db/db.client')

//Validate Position
const Joi = require("joi");

const createPositionsSchema = Joi.object({
  name: Joi.string().min(5).max(100).required(),
});
const getOnePositionsSchema = Joi.object({
  id: Joi.number().integer().required(),
});
const updatePositionsSchema = Joi.object({
  name: Joi.string().min(5).max(100).required(),
  id: Joi.number().integer().required(),
});

//Loging changes
const logingChangesPositions = `
CREATE OR REPLACE FUNCTION logingChangesPositions()
RETURNS TRIGGER AS $$
DECLARE
  roles_caption TEXT;
BEGIN

    SELECT r.capton INTO roles_caption
    FROM roles r
    WHERE r.id = (SELECT id_roles FROM specialist)

    INSERT INTO history_of_change (date_and_time_of_the_operation, who_changed_it, the_object_of_operation, changed_fields, add_at)
    VALUES (
        NOW(),
        COALESCE(roles_caption, 'unknow'),
        'positions',
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

const logingChangesPositionsTrigger = `
CREATE TRIGGER logingChangesPositionsTrigger
AFTER INSERT OR UPDATE OR DELETE ON positions
FOR EACH ROW EXECUTE FUNCTION logingChangesPositions();
`;
//Position
class PositionController {
  //CREATEA
  async createPositions(req, res) {
    const { error } = createPositionsSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const { name, add_at } = req.body;
    try {
      const new_position = await pool.query(
        "INSERT INTO positions (name, add_at) values ($1, NOW()) RETURNING *",
        [name, add_at]
      );

      await pool.query(logingChangesPositions);
      await pool.query(logingChangesPositionsTrigger);

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
