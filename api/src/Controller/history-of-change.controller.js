const pool = require("../db/db.client");

const { getOneHistoryOfChangeSchema } = require ("./dto/history-of-change.dto");

//History of change
class HistoryOfChangeController {
  //GET
  async getHistoryOfChange(req, res) {
    try {
      const history_of_changes = await pool.query(
        "SELECT * FROM history_of_change WHERE deleted_at = NULL"
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
}

module.exports = new HistoryOfChangeController();
