const { Pool } = require('pg');

const pool = new Pool({ 
    connectionString: process.env.DATABASE_URL, 
  });

//Organization
class OrganizationController {
    async createOrganization (req, res){
        const{name, comment} = req.body
        try{
            const organizations = await db.query('INSERT INTO organizations (name, comment) values ($1, $2) RETURNING *', [name, comment])
            res.json(organizations.rows)
        }
        catch{
            
            res.status(500).json({ error: error.message });
        }
    }
    async getOrganization (req, res){
        try{
            const organizations = await db.query('SELECT * FROM organizations')
            res.json(organizations.rows)
        }
        catch{
            
            res.status(500).json({ error: error.message });
        }
    }
    async getOneOrganization (req, res){
        const id = req.params.id
        try{
            const organizations = await db.query('SELECT * FROM organizations WHERE id = $1' [id])
            if (organizations.rows.length > 0) {
                res.json(organizations.rows[0]);}
            else { 
                res.status(404).json({ message: 'Организация не найдена' });}
            
        }
        catch{
            
            res.status(500).json({ error: error.message });
        }
    }
    async updateOrganization (req, res){
        const {id, name, comment} = req.body
        try{
            const organizations = await db.query('UPDATE organizations set name = $1 comment = $2 WHERE id = $3 RETURNING *', [name, comment, id])
            if (organizations.rows.length > 0) {
                res.json(organizations.rows[0]);}
            else { 
                res.status(404).json({ message: 'Организация не найдена' });}
            }
            catch{
                
            res.status(500).json({ error: error.message });
            }
    }
    async deleteOrganization (req, res){
        const id = req.params.id
        try{
            const organizations = await db.query('DELETE FROM organizations WHERE id = $1' [id])
            if (organizations.rows.length > 0) {
                res.json(organizations.rows[0]);}
            else { 
                res.status(404).json({ message: 'Организация не найдена' });}
        }
        catch{
                
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new OrganizationController ()