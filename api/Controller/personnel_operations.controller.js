const { Pool } = require('pg');

const pool = new Pool({ 
    connectionString: process.env.DATABASE_URL, 
  });

//Personnel operations
class personnel_operations_controller {
    async create_personnel_operations (req, res){
        const{id_employee, id_department, id_position, setting_the_salary, salary_change, dismissal_from_work} = req.body
        const new_personnel_operations = await db.query('INSERT INTO personnel_operations (id_employee, id_department, id_position, setting_the_salary, salary_change, dismissal_from_work) values ($1, $2, $3, $4, $5, false) RETURNING *', [id_employee, id_department, id_position, setting_the_salary, salary_change])
        res.json(new_personnel_operations.rows[0])

    }
    async get_personnel_operations(req, res){
        const personnel_operations = await db.query('SELECT * FROM personnel_operations WHERE dismissal_from_work = false')
        res.json(personnel_operations.rows)
    }
    async get_one_personnel_operations (req, res){
        const id = req.params.id
        const personnel_operations = await db.query('SELECT * FROM personnel_operations WHERE id = $1' [id])
        if (positions.rows.length > 0) {
        res.json(personnel_operations.rows);}
        else { 
            res.status(404).json({ message: 'Опреация не найдена' });}
    }
    async update_personnel_operations (req, res){
        const {id, name, comment} = req.body
        const personnel_operations = await db.query('UPDATE personnel_operations set id_employee = $1 id_department = $2 id_position =$3 setting_the_salary = $4 salary_change = $5 dismissal_from_work = $6 WHERE id = $7 RETURNING *', [id_employee, id_department, id_position, setting_the_salary, salary_change, dismissal_from_work, id])
        if (positions.rows.length > 0) {
            res.json(personnel_operations.rows);}
            else { 
                res.status(404).json({ message: 'Опреация не найдена' });}
    }
    async delete_personnel_operations (req, res){
        const id = req.params.id
        const personnel_operations = await db.query('DELETE FROM personnel_operations WHERE id = $1' [id])
        if (positions.rows.length > 0) {
            res.json(personnel_operations.rows);}
            else { 
                res.status(404).json({ message: 'Опреация не найдена' });}
    }
    async soft_delete_employees(req, res) {
        const { id } = req.params;

        try {
            const result = await db.query(
                `UPDATE personnel_operations 
                 SET dismissal_from_work = true 
                 WHERE id = $1 
                 RETURNING *`,
                [id]
            );

            if (result.rows.length === 0) {
                return res.status(404).json({ message: 'Неудалось уволить сотрудника, проверьте введённые данные' });
            }

            res.status(200).json({
                message: 'Сотрудник уволен',
                operation: result.rows[0]
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}


module.exports = new personnel_operations_controller ()