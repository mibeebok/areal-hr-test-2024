const pool = new Pool({ 
    connectionString: process.env.DATABASE_URL, 
  });

//Week two

//Organization
class organization_controller {
    async create_organization (req, res){
        const{name, comment} = req.body
        const new_organization = await db.query('INSERT INTO organizations (name, comment) values ($1, $2) RETURNING *', [name, comment])
        res.json(new_organization.rows[0])

    }
    async get_organization (req, res){
        const organizations = await db.query('SELECT * FROM organizations')
        res.json(organizations.rows)
    }
    async get_one_organization (req, res){
        const id = req.params.id
        const organizations = await db.query('SELECT * FROM organizations WHERE id = $1' [id])
        res.json(organizations.rows)
    }
    async update_organization (req, res){
        const {id, name, comment} = req.body
        const organizations = await db.query('UPDATE organizations set name = $1 comment = $2 WHERE id = $3 RETURNING *', [name, comment, id])
        res.json(organizations.rows[0])
    }
    async delete_organization (req, res){
        const id = req.params.id
        const organizations = await db.query('DELETE FROM organizations WHERE id = $1' [id])
        res.json(organizations.rows)
    }
}

//Department
class department_controller {
    async create_department (req, res){
        const{id_organization, parent, name, comment} = req.body
        const new_department = await db.query('INSERT INTO department (id_organization, parent, name, comment) values ($1, $2, $3, $4) RETURNING *', [id_organization, parent, name, comment])
        res.json(new_department.rows[0])

    }
    async get_department (req, res){
        const departments = await db.query('SELECT * FROM department')
        res.json(departments.rows)
    }
    async get_one_department (req, res){
        const id = req.params.id
        const departments = await db.query('SELECT * FROM department WHERE id = $1' [id])
        res.json(departments.rows)
    }
    async update_department (req, res){
        const {id, name, comment} = req.body
        const departments = await db.query('UPDATE department set id_organization = $1 parent = $2 name = $3 comment = $4 WHERE id = $5 RETURNING *', [id_organization, parent, name, comment, id])
        res.json(departments.rows[0])
    }
    async delete_department (req, res){
        const id = req.params.id
        const departments = await db.query('DELETE FROM department WHERE id = $1' [id])
        res.json(departments.rows)
    }
}

//Position
class position_controller {
    async create_position (req, res){
        const{id_employee, id_department, id_position, setting_the_salary, salary_change, dismissal_from_work} = req.body
        const new_position = await db.query('INSERT INTO position (id_employee, id_department, id_position, setting_the_salary, salary_change, dismissal_from_work) values ($1, $2, $3, $4, $5, $6) RETURNING *', [id_employee, id_department, id_position, setting_the_salary, salary_change, dismissal_from_work])
        res.json(new_position.rows[0])

    }
    async get_position(req, res){
        const positions = await db.query('SELECT * FROM position')
        res.json(positions.rows)
    }
    async get_one_positions (req, res){
        const id = req.params.id
        const positions = await db.query('SELECT * FROM position WHERE id = $1' [id])
        res.json(positions.rows)
    }
    async update_positions (req, res){
        const {id, name, comment} = req.body
        const positions = await db.query('UPDATE position set id_employee = $1 id_department = $2 id_position =$3 setting_the_salary = $4 salary_change = $5 dismissal_from_work = $6 WHERE id = $7 RETURNING *', [id_employee, id_department, id_position, setting_the_salary, salary_change, dismissal_from_work, id])
        res.json(positions.rows[0])
    }
    async delete_position (req, res){
        const id = req.params.id
        const positions = await db.query('DELETE FROM position WHERE id = $1' [id])
        res.json(positions.rows)
    }
}
module.exports = new organization_controller ()
module.exports = new department_controller ()
module.exports = new position_controller ()
