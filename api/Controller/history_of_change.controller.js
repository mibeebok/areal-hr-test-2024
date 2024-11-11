const { Pool } = require('pg');

const pool = new Pool({ 
    connectionString: process.env.DATABASE_URL, 
  });

//History of change
class history_of_change_controller {
    async create_history_of_change (req, res){
        const{date_and_time_of_the_operation, who_changed_it, the_object_of_operation, changed_fields} = req.body
        const new_history_of_change = await db.query('INSERT INTO history_of_change (date_and_time_of_the_operation, who_changed_it, the_object_of_operation, changed_fields) values ($1, $2, $3, $4) RETURNING *', [date_and_time_of_the_operation, who_changed_it, the_object_of_operation, changed_fields])
        res.json(new_history_of_change.rows[0])

    }
    async get_history_of_change(req, res){
        const history_of_changes = await db.query('SELECT * FROM history_of_change')
        res.json(history_of_changes.rows)
    }
    async get_one_history_of_change (req, res){
        const id = req.params.id
        const history_of_changes = await db.query('SELECT * FROM history_of_change WHERE id = $1' [id])
        if (positions.rows.length > 0) {
        res.json(history_of_changes.rows);}
        else { 
            res.status(404).json({ message: 'История изменений не найдена' });}
    }
    async update_history_of_change (req, res){
        const {id, name, comment} = req.body
        const history_of_changes = await db.query('UPDATE history_of_change set date_and_time_of_the_operation = $1 who_changed_it = $2 the_object_of_operation = $3 changed_fields = $4 dismissal_from_work = $6 WHERE id = $5 RETURNING *', [date_and_time_of_the_operation, who_changed_it, the_object_of_operation, changed_fields, id])
        if (positions.rows.length > 0) {
            res.json(history_of_changes.rows);}
            else { 
                res.status(404).json({ message: 'История изменений не найдена' });}
    }
    async delete_history_of_change (req, res){
        const id = req.params.id
        const history_of_changes = await db.query('DELETE FROM history_of_change WHERE id = $1' [id])
        if (positions.rows.length > 0) {
            res.json(history_of_changes.rows);}
            else { 
                res.status(404).json({ message: 'История изменений не найдена' });}
    }
}


module.exports = new history_of_change_controller ()