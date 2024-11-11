const { Pool } = require('pg');

const pool = new Pool({ 
    connectionString: process.env.DATABASE_URL, 
  });

//Department
class department_controller {
    async create_departments (req, res){
        const{id_organization, parent, name, comment} = req.body
        const new_departments = await db.query('INSERT INTO departments (id_organization, parent, name, comment) values ($1, $2, $3, $4) RETURNING *', [id_organization, parent, name, comment])
        res.json(new_departments.rows)

    }
    async get_departments (req, res){
        const departments = await db.query('SELECT * FROM departments')
        res.json(departments.rows)
    }
    async get_one_departments (req, res){
        const id = req.params.id
        const departments = await db.query('SELECT * FROM departments WHERE id = $1' [id])
        if (positions.rows.length > 0) {
            res.json(new_department.rows[0]);}
            else { 
                res.status(404).json({ message: 'Отдел не найден' });}
    }
    async update_departments (req, res){
        const {id, name, parent, comment} = req.body
        const departments = await db.query('UPDATE departments set id_organization = $1 parent = $2 name = $3 comment = $4 WHERE id = $5 RETURNING *', [id_organization, parent, name, comment, id])
        if (positions.rows.length > 0) {
            res.json(new_department.rows[0]);}
            else { 
                res.status(404).json({ message: 'Отдел не найден' });}
    }
    async delete_departments (req, res){
        const id = req.params.id
        const departments = await db.query('DELETE FROM departments WHERE id = $1' [id])
        if (positions.rows.length > 0) {
            res.json(new_department.rows[0]);}
            else { 
                res.status(404).json({ message: 'Отдел не найден' });}
    }
}

module.exports = new department_controller ()