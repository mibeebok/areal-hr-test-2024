const { Pool } = require('pg');

const pool = new Pool({ 
    connectionString: process.env.DATABASE_URL, 
  });

//History of change
class HistoryOfChangeController {
    async createHistoryOfChange (req, res){
        const{date_and_time_of_the_operation, who_changed_it, the_object_of_operation, changed_fields} = req.body
    try{
        const history_of_changes = await pool.query('INSERT INTO history_of_change (date_and_time_of_the_operation, who_changed_it, the_object_of_operation, changed_fields) values ($1, $2, $3, $4) RETURNING *', [date_and_time_of_the_operation, who_changed_it, the_object_of_operation, changed_fields])
        res.json(history_of_changes.rows[0])
    }
    catch{
        
        res.status(500).json({ error: error.message });
    }

    }
    async getHistoryOfChange(req, res){
    try{
        const history_of_changes = await pool.query('SELECT * FROM history_of_change')
        res.json(history_of_changes.rows)
    }
    catch{
        
        res.status(500).json({ error: error.message });
    }
    }
    async getOneHistoryOfChange (req, res){
        const id = req.params.id
    try{
        const history_of_changes = await pool.query('SELECT * FROM history_of_change WHERE id = $1' [id])
        if (history_of_changes.rows.length > 0) {
        res.json(history_of_changes.rows);}
        else { 
            res.status(404).json({ message: 'История изменений не найдена' });}
    }
    catch{
            
        res.status(500).json({ error: error.message });
    }
    }
    async updateHistoryOfChange (req, res){
        const {id, name, comment} = req.body
        try{
            const history_of_changes = await pool.query('UPDATE history_of_change set date_and_time_of_the_operation = $1 who_changed_it = $2 the_object_of_operation = $3 changed_fields = $4 dismissal_from_work = $6 WHERE id = $5 RETURNING *', [date_and_time_of_the_operation, who_changed_it, the_object_of_operation, changed_fields, id])
            if (history_of_changes.rows.length > 0) {
                res.json(history_of_changes.rows);}
            else { 
                res.status(404).json({ message: 'История изменений не найдена' });}
        }
        catch{
                
            res.status(500).json({ error: error.message });
        }
    }
    async deleteHistoryOfChange (req, res){
        const id = req.params.id
        try{
            const history_of_changes = await pool.query('DELETE FROM history_of_change WHERE id = $1' [id])
            if (history_of_changes.rows.length > 0) {
                res.json(history_of_changes.rows);}
            else { 
                res.status(404).json({ message: 'История изменений не найдена' });}
            }
        catch{
                
            res.status(500).json({ error: error.message });
        }
    }
}


module.exports = new HistoryOfChangeController ()