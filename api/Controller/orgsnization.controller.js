const { Pool } = require('pg');

const pool = new Pool({ 
    connectionString: process.env.DATABASE_URL, 
  });

//Organization
class organization_controller {
    async create_organization (req, res){
        const{name, comment} = req.body
        const new_organization = await db.query('INSERT INTO organizations (name, comment) values ($1, $2) RETURNING *', [name, comment])
        res.json(organizations.rows)

    }
    async get_organization (req, res){
        const organizations = await db.query('SELECT * FROM organizations')
        res.json(organizations.rows)
    }
    async get_one_organization (req, res){
        const id = req.params.id
        const organizations = await db.query('SELECT * FROM organizations WHERE id = $1' [id])
        if (positions.rows.length > 0) {
            res.json(new_organization.rows[0]);}
            else { 
                res.status(404).json({ message: 'Организация не найдена' });}
    }
    async update_organization (req, res){
        const {id, name, comment} = req.body
        const organizations = await db.query('UPDATE organizations set name = $1 comment = $2 WHERE id = $3 RETURNING *', [name, comment, id])
        if (positions.rows.length > 0) {
            res.json(new_organization.rows[0]);}
            else { 
                res.status(404).json({ message: 'Организация не найдена' });}
    }
    async delete_organization (req, res){
        const id = req.params.id
        const organizations = await db.query('DELETE FROM organizations WHERE id = $1' [id])
        if (positions.rows.length > 0) {
            res.json(new_organization.rows[0]);}
            else { 
                res.status(404).json({ message: 'Организация не найдена' });}
    }
}

module.exports = new organization_controller ()