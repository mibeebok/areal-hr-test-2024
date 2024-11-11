const { Pool } = require('pg');

const pool = new Pool({ 
    connectionString: process.env.DATABASE_URL, 
  });

//Files
class files_controller {
    async create_files (req, res){
        const{name, file} = req.body
        const new_files= await db.query('INSERT INTO files (name, file) values ($1, $2) RETURNING *', [name, file])
        res.json(new_files.rows[0])

    }
    async get_files (req, res){
        const files = await db.query('SELECT * FROM files')
        res.json(files.rows)
    }
    async get_one_files (req, res){
        const id = req.params.id
        const files = await db.query('SELECT * FROM files WHERE id = $1' [id])
        if (positions.rows.length > 0) {
        res.json(files.rows);}
        else { 
            res.status(404).json({ message: 'Файл не найден' });}
    }
    async update_files (req, res){
        const {id, name, comment} = req.body
        const files = await db.query('UPDATE files set name = $1 file = $2 WHERE id = $3 RETURNING *', [name, file, id])
        if (positions.rows.length > 0) {
            res.json(files.rows);}
            else { 
                res.status(404).json({ message: 'Файл не найден' });}
    }
    async delete_files (req, res){
        const id = req.params.id
        const files = await db.query('DELETE FROM files WHERE id = $1' [id])
        if (positions.rows.length > 0) {
            res.json(files.rows);}
            else { 
                res.status(404).json({ message: 'Файл не найден' });}
    }
}


module.exports = new files_controller ()