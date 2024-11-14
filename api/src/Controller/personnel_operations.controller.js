const { Pool } = require('pg');

const pool = new Pool({ 
    connectionString: process.env.DATABASE_URL, 
  });

//Personnel operations
class PersonnelOperationsController {
    async createPersonnelOperations (req, res){
        const{id_employee, id_department, id_position, setting_the_salary, salary_change, dismissal_from_work} = req.body
        try{
        const new_personnel_operations = await pool.query('INSERT INTO personnel_operations (id_employee, id_department, id_position, setting_the_salary, salary_change, dismissal_from_work) values ($1, $2, $3, $4, $5, false) RETURNING *', [id_employee, id_department, id_position, setting_the_salary, salary_change])
        res.json(new_personnel_operations.rows[0])
        }
        catch{
            
            res.status(500).json({ error: error.message });
        }

    }
    async getPersonnelOperations(req, res){
        try{
        const personnel_operations = await pool.query('SELECT * FROM personnel_operations WHERE dismissal_from_work = false')
        res.json(personnel_operations.rows)
        }
        catch{
            
            res.status(500).json({ error: error.message });
        }
    }
    async getOnePersonnelOperations (req, res){
        const id = req.params.id
        try{
        const personnel_operations = await pool.query('SELECT * FROM personnel_operations WHERE id = $1' [id])
        if (personnel_operations.rows.length > 0) {
        res.json(personnel_operations.rows);}
        else { 
            res.status(404).json({ message: 'Опреация не найдена' });}
        }
        catch{
            
            res.status(500).json({ error: error.message });
        }
    }
    async updatePersonnelOperations (req, res){
        const {id, name, comment} = req.body
        try{
        const personnel_operations = await pool.query('UPDATE personnel_operations set id_employee = $1 id_department = $2 id_position =$3 setting_the_salary = $4 salary_change = $5 dismissal_from_work = $6 WHERE id = $7 RETURNING *', [id_employee, id_department, id_position, setting_the_salary, salary_change, dismissal_from_work, id])
        if (personnel_operations.rows.length > 0) {
            res.json(personnel_operations.rows);}
            else { 
                res.status(404).json({ message: 'Опреация не найдена' });}
        }
        catch{
                
            res.status(500).json({ error: error.message });
        }
    }
    async deletePersonnelOperations (req, res){
        const id = req.params.id
        try{
        const personnel_operations = await pool.query('DELETE FROM personnel_operations WHERE id = $1' [id])
        if (personnel_operations.rows.length > 0) {
            res.json(personnel_operations.rows);}
            else { 
                res.status(404).json({ message: 'Опреация не найдена' });}
        }
        catch{
                
            res.status(500).json({ error: error.message });
        }
    }
    async softDeleteEmployees(req, res) {
        const { id } = req.params;
        try {
            const result = await pool.query(
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


module.exports = new PersonnelOperationsController ()