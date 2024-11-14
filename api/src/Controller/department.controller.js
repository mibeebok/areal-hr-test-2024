const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

//Department
class DepartmentController {
  async createDepartments(req, res) {
    const { id_organization, parent, name, comment } = req.body;
    try {
      const departments = await pool.query(
        "INSERT INTO departments (id_organization, parent, name, comment) values ($1, $2, $3, $4) RETURNING *",
        [id_organization, parent, name, comment]
      );
      res.json(departments.rows);
    } catch {
      res.status(500).json({ error: error.message });
    }
  }
  async getDepartments(req, res) {
    try {
      const departments = await pool.query("SELECT * FROM departments");
      res.json(departments.rows);
    } catch {
      res.status(500).json({ error: error.message });
    }
  }
  async getOneDepartments(req, res) {
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
    } catch {
      res.status(500).json({ error: error.message });
    }
  }
  async updateDepartments(req, res) {
    const { id, name, parent, comment } = req.body;
    try {
      const departments = await pool.query(
        "UPDATE departments set id_organization = $1 parent = $2 name = $3 comment = $4 WHERE id = $5 RETURNING *",
        [id_organization, parent, name, comment, id]
      );
      if (departments.rows.length > 0) {
        res.json(departments.rows[0]);
      } else {
        res.status(404).json({ message: "Отдел не найден" });
      }
    } catch {
      res.status(500).json({ error: error.message });
    }
  }
  async deleteDepartments(req, res) {
    const id = req.params.id;
    try {
      const departments = await pool.query(
        "DELETE FROM departments WHERE id = $1"[id]
      );
      if (departments.rows.length > 0) {
        res.json(departments.rows[0]);
      } else {
        res.status(404).json({ message: "Отдел не найден" });
      }
    } catch {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new DepartmentController();
