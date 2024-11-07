const  db = require('../arealtest2024db')
class OrganizationController {
    async createOrganization (req, res){
        const{Name, Comment} = req.body
        const newOrganization = await db.query('INSERT INTO Organizations (Name, Comment) values ($1, $2) RETURNING *', [Name, Comment])
        res.json(newOrganization.rows[0])

    }
    async getOrganization (req, res){
        const organizations = await db.query('SELECT * FROM Organizations')
        res.json(organizations.rows)
    }
    async getOneOrganization (req, res){
        const id = req.params.id
        const organizations = await db.query('SELECT * FROM Organizations WHERE IdOrganization = $1' [id])
        res.json(organizations.rows)
    }
    async updateOrganization (req, res){
        const {IdOrganization, Name, Comment} = req.body
        const organizations = await db.query('UPDATE Organizations set Name = $1 Comment = $2 WHERE IdOrganization = $3 RETURNING *', [Name, Comment, IdOrganization])
        res.json(organizations.rows[0])
    }
    async deleteOrganization (req, res){
        const id = req.params.id
        const organizations = await db.query('DELETE FROM Organizations WHERE IdOrganization = $1' [id])
        res.json(organizations.rows)
    }
}

module.exports = new OrganizationController ()