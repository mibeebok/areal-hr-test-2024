const { Pool } = require('pg');

const pool = new Pool({ 
    connectionString: process.env.DATABASE_URL, 
  });

//Position
class position_controller {
    async create_positions (req, res){
        const{name} = req.body
        const new_position = await db.query('INSERT INTO positions (name) values ($1) RETURNING *', [name])
        res.json(new_position.rows[0])

    }
    async get_positions(req, res){
        const positions = await db.query('SELECT * FROM positions')
        res.json(new_position.rows[0])
    }
    async get_one_positions (req, res){
        const id = req.params.id
        const positions = await db.query('SELECT * FROM positions WHERE id = $1' [id])
        if (positions.rows.length > 0) {
            res.json(positions.rows);}
            else { 
                res.status(404).json({ message: 'Должность не найдена' });}
    }
    async update_positions (req, res){
        const {id, name, comment} = req.body
        const positions = await db.query('UPDATE positions set name = $1 WHERE id = $7 RETURNING *', [name, id])
        if (positions.rows.length > 0) {
            res.json(positions.rows);}
            else { 
                res.status(404).json({ message: 'Должность не найдена' });}
    }
    async delete_positions (req, res){
        const id = req.params.id
        const positions = await db.query('DELETE FROM positions WHERE id = $1' [id])
        if (positions.rows.length > 0) {
            res.json(positions.rows);}
            else { 
                res.status(404).json({ message: 'Должность не найдена' });}
    }
}


module.exports = new position_controller ()