const { Pool } = require('pg');

const pool = new Pool({ 
    connectionString: process.env.DATABASE_URL, 
  });

//Position
class PositionController {
    async createPositions (req, res){
        const{name} = req.body
        try{
        const new_position = await db.query('INSERT INTO positions (name) values ($1) RETURNING *', [name])
        res.json(new_position.rows[0])
        }
        catch{
            
            res.status(500).json({ error: error.message });
        }

    }
    async getPositions(req, res){
        try{
        const positions = await db.query('SELECT * FROM positions')
        res.json(positions.rows[0])
        }
        catch{
            
            res.status(500).json({ error: error.message });
        }
    }
    async getOnePositions (req, res){
        const id = req.params.id
        try{
        const positions = await db.query('SELECT * FROM positions WHERE id = $1' [id])
        if (positions.rows.length > 0) {
            res.json(positions.rows);}
            else { 
                res.status(404).json({ message: 'Должность не найдена' });}
        }
        catch{
                
            res.status(500).json({ error: error.message });
        }
    }
    async updatePositions (req, res){
        const {id, name, comment} = req.body
        try{
        const positions = await db.query('UPDATE positions set name = $1 WHERE id = $7 RETURNING *', [name, id])
        if (positions.rows.length > 0) {
            res.json(positions.rows);}
            else { 
                res.status(404).json({ message: 'Должность не найдена' });}
            }
        catch{
                
            res.status(500).json({ error: error.message });
        }
    }
    async deletePositions (req, res){
        const id = req.params.id
        try{
        const positions = await db.query('DELETE FROM positions WHERE id = $1' [id])
        if (positions.rows.length > 0) {
            res.json(positions.rows);}
            else { 
                res.status(404).json({ message: 'Должность не найдена' });}
            }
            catch{
                
            res.status(500).json({ error: error.message });
            }
    }
}


module.exports = new PositionController ()