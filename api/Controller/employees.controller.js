const { Pool } = require('pg');

const pool = new Pool({ 
    connectionString: process.env.DATABASE_URL, 
  });

//Employees
class employees_controller {
    async create_employees(req, res){
        const{first_name, name, patronymic, date_of_birth, id_passport_data, id_registration_address, id_scan} = req.body
        const new_employees = await db.query('INSERT INTO employees (first_name, name, patronymic, date_of_birth, id_passport_data, id_registration_address, id_scan) values ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [first_name, name, patronymic, date_of_birth, id_passport_data, id_registration_address, id_scan])
        res.json(new_employees.rows[0])

    }
    async get_employees (req, res){
        const employees = await db.query('SELECT * FROM employees')
        res.json(employees.rows)
    }
    async get_one_employees (req, res){
        const id = req.params.id
        const employees = await db.query('SELECT * FROM employees WHERE id = $1' [id])
        if (positions.rows.length > 0) {
        res.json(employees.rows);}
        else { 
            res.status(404).json({ message: 'Сотрудник не найден' });}
    }
    async update_employees (req, res){
        const {id, name, comment} = req.body
        const employees = await db.query('UPDATE employees set first_name = $1 name = $2 patronymic = $3 date_of_birth = $4 id_passport_data = $5 id_registration_address = $6 id_scan = $7 WHERE id = $8 RETURNING *', [first_name, name, patronymic, date_of_birth, id_passport_data, id_registration_address, id_scan, id])
        if (positions.rows.length > 0) {
            res.json(employees.rows);}
            else { 
                res.status(404).json({ message: 'Сотрудник не найден' });}
    }
    async delete_employees (req, res){
        const id = req.params.id
        const employees = await db.query('DELETE FROM employees WHERE id = $1' [id])
        if (positions.rows.length > 0) {
            res.json(employees.rows);}
            else { 
                res.status(404).json({ message: 'Сотрудник не найден' });}
    }
}


module.exports = new employees_controller ()