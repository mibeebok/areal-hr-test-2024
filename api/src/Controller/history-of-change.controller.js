const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

//Validate History of change
const Joi = require("joi");
const {
  generateColumnString,
} = require("node-pg-migrate/dist/operations/indexes/shared");

const createHistoryOfChangeSchema = Joi.object({
  date_and_time_of_the_operation: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}$/) // Проверка формата YYYY-MM-DD
    .required(),
  who_changed_it: Joi.number().integer().required(),
  the_object_of_operation: Joi.string().required(),
  changed_fields: Joi.object().optional(),
});
const getOneHistoryOfChangeSchema = Joi.object({
  id: Joi.number().integer().required(),
});
const updateHistoryOfChangeSchema = Joi.object({
  date_and_time_of_the_operation: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}$/) // Проверка формата YYYY-MM-DD
    .required(),
  who_changed_it: Joi.number().integer().required(),
  the_object_of_operation: Joi.string().required(),
  changed_fields: Joi.object().optional(),
  id: Joi.number().integer().required(),
});

//History of change
class HistoryOfChangeController {
  //CREATE
  /*async createHistoryOfChange(req, res) {
    const { error } = createHistoryOfChangeSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const {
      date_and_time_of_the_operation,
      who_changed_it,
      the_object_of_operation,
      changed_fields,
    } = req.body;
    try {
      const history_of_changes = await pool.query(
        "INSERT INTO history_of_change (date_and_time_of_the_operation, who_changed_it, the_object_of_operation, changed_fields, add_at) values ($1, $2, $3, $4, NOW()) RETURNING *",
        [
          date_and_time_of_the_operation,
          who_changed_it,
          the_object_of_operation,
          changed_fields,
        ]
      );
      res.json(history_of_changes.rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }*/
  //GET
  async getHistoryOfChange(req, res) {
    try {
      const history_of_changes = await pool.query(
        "SELECT * FROM history_of_change"
      );
      res.json(history_of_changes.rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  //GET ONE
  async getOneHistoryOfChange(req, res) {
    const { error } = getOneHistoryOfChangeSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const id = req.params.id;
    try {
      const history_of_changes = await pool.query(
        "SELECT * FROM history_of_change WHERE id = $1"[id]
      );
      if (history_of_changes.rows.length > 0) {
        res.json(history_of_changes.rows);
      } else {
        res.status(404).json({ message: "История изменений не найдена" });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  //UPDATE
  /*async updateHistoryOfChange(req, res) {
    const { error } = updateHistoryOfChangeSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const {
      date_and_time_of_the_operation,
      who_changed_it,
      the_object_of_operation,
      changed_fields,
      dismissal_from_work,
      update_at,
      id,
    } = req.body;
    try {
      const history_of_changes = await pool.query(
        "UPDATE history_of_change set date_and_time_of_the_operation = $1 who_changed_it = $2 the_object_of_operation = $3 changed_fields = $4 dismissal_from_work = $6, update_at = NOW() WHERE id = $7 RETURNING *",
        [
          date_and_time_of_the_operation,
          who_changed_it,
          the_object_of_operation,
          changed_fields,
          dismissal_from_work,
          update_at,
          id,
        ]
      );
      if (history_of_changes.rows.length > 0) {
        res.json(history_of_changes.rows);
      } else {
        res.status(404).json({ message: "История изменений не найдена" });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }*/
  //DELETE
  /*async deleteHistoryOfChange(req, res) {
    const id = req.params.id;
    try {
      const history_of_changes = await pool.query(
        "UPDATE FROM history_of_change SET delete_at = NOW() WHERE id = $1"[id]
      );
      if (history_of_changes.rows.length > 0) {
        res.json(history_of_changes.rows);
      } else {
        res.status(404).json({ message: "История изменений не найдена" });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }*/
}

module.exports = new HistoryOfChangeController();
