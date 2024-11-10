const pool = new Pool({ 
    connectionString: process.env.DATABASE_URL, 
  });

//Week two

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

//Department
class department_controller {
    async create_department (req, res){
        const{id_organization, parent, name, comment} = req.body
        const new_department = await db.query('INSERT INTO departments (id_organization, parent, name, comment) values ($1, $2, $3, $4) RETURNING *', [id_organization, parent, name, comment])
        res.json(departments.rows)

    }
    async get_department (req, res){
        const departments = await db.query('SELECT * FROM departments')
        res.json(departments.rows)
    }
    async get_one_department (req, res){
        const id = req.params.id
        const departments = await db.query('SELECT * FROM departments WHERE id = $1' [id])
        if (positions.rows.length > 0) {
            res.json(new_department.rows[0]);}
            else { 
                res.status(404).json({ message: 'Отдел не найден' });}
    }
    async update_department (req, res){
        const {id, name, parent, comment} = req.body
        const departments = await db.query('UPDATE departments set id_organization = $1 parent = $2 name = $3 comment = $4 WHERE id = $5 RETURNING *', [id_organization, parent, name, comment, id])
        if (positions.rows.length > 0) {
            res.json(new_department.rows[0]);}
            else { 
                res.status(404).json({ message: 'Отдел не найден' });}
    }
    async delete_department (req, res){
        const id = req.params.id
        const departments = await db.query('DELETE FROM departments WHERE id = $1' [id])
        if (positions.rows.length > 0) {
            res.json(new_department.rows[0]);}
            else { 
                res.status(404).json({ message: 'Отдел не найден' });}
    }
}

//Position
class position_controller {
    async create_position (req, res){
        const{name} = req.body
        const new_position = await db.query('INSERT INTO positions (name) values ($1) RETURNING *', [name])
        res.json(new_position.rows[0])

    }
    async get_position(req, res){
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
    async delete_position (req, res){
        const id = req.params.id
        const positions = await db.query('DELETE FROM positions WHERE id = $1' [id])
        if (positions.rows.length > 0) {
            res.json(positions.rows);}
            else { 
                res.status(404).json({ message: 'Должность не найдена' });}
    }
}
module.exports = new organization_controller ()
module.exports = new department_controller ()
module.exports = new position_controller ()

//Week tree

//Employees
class employees_controller {
    async create_employees(req, res){
        const{first_name, name, patronymic, date_of_birth, id_passport_data, id_registration_address, id_scan} = req.body
        const new_employees = await db.query('INSERT INTO employees (first_name, name, patronymic, date_of_birth, id_passport_data, id_registration_address, id_scan) values ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [first_name, name, patronymic, date_of_birth, id_passport_data, id_registration_address, id_scan])
        res.json(new_employees.rows[0])

    }
    async get_employees (req, res){
        const employeess = await db.query('SELECT * FROM employees')
        res.json(employeess.rows)
    }
    async get_one_employees (req, res){
        const id = req.params.id
        const employeess = await db.query('SELECT * FROM employees WHERE id = $1' [id])
        if (positions.rows.length > 0) {
        res.json(employeess.rows);}
        else { 
            res.status(404).json({ message: 'Сотрудник не найден' });}
    }
    async update_employees (req, res){
        const {id, name, comment} = req.body
        const employeess = await db.query('UPDATE employees set first_name = $1 name = $2 patronymic = $3 date_of_birth = $4 id_passport_data = $5 id_registration_address = $6 id_scan = $7 WHERE id = $8 RETURNING *', [first_name, name, patronymic, date_of_birth, id_passport_data, id_registration_address, id_scan, id])
        if (positions.rows.length > 0) {
            res.json(employeess.rows);}
            else { 
                res.status(404).json({ message: 'Сотрудник не найден' });}
    }
    async delete_employees (req, res){
        const id = req.params.id
        const employeess = await db.query('DELETE FROM employees WHERE id = $1' [id])
        if (positions.rows.length > 0) {
            res.json(employeess.rows);}
            else { 
                res.status(404).json({ message: 'Сотрудник не найден' });}
    }
}

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

//Personnel operations
class personnel_operations_controller {
    async create_personnel_operations (req, res){
        const{id_employee, id_department, id_position, setting_the_salary, salary_change, dismissal_from_work} = req.body
        const new_personnel_operations = await db.query('INSERT INTO personnel_operations (id_employee, id_department, id_position, setting_the_salary, salary_change, dismissal_from_work) values ($1, $2, $3, $4, $5, $6) RETURNING *', [id_employee, id_department, id_position, setting_the_salary, salary_change, dismissal_from_work])
        res.json(new_personnel_operations.rows[0])

    }
    async get_personnel_operations(req, res){
        const personnel_operations = await db.query('SELECT * FROM personnel_operations')
        res.json(personnel_operations.rows)
    }
    async get_one_personnel_operations (req, res){
        const id = req.params.id
        const personnel_operations = await db.query('SELECT * FROM personnel_operations WHERE id = $1' [id])
        if (positions.rows.length > 0) {
        res.json(personnel_operations.rows);}
        else { 
            res.status(404).json({ message: 'Опреация не найдена' });}
    }
    async update_personnel_operations (req, res){
        const {id, name, comment} = req.body
        const personnel_operations = await db.query('UPDATE personnel_operations set id_employee = $1 id_department = $2 id_position =$3 setting_the_salary = $4 salary_change = $5 dismissal_from_work = $6 WHERE id = $7 RETURNING *', [id_employee, id_department, id_position, setting_the_salary, salary_change, dismissal_from_work, id])
        if (positions.rows.length > 0) {
            res.json(personnel_operations.rows);}
            else { 
                res.status(404).json({ message: 'Опреация не найдена' });}
    }
    async delete_personnel_operations (req, res){
        const id = req.params.id
        const personnel_operations = await db.query('DELETE FROM personnel_operations WHERE id = $1' [id])
        if (positions.rows.length > 0) {
            res.json(personnel_operations.rows);}
            else { 
                res.status(404).json({ message: 'Опреация не найдена' });}
    }
}

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
    async get_one_history_of_changes (req, res){
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
module.exports = new employees_controller ()
module.exports = new files_controller ()
module.exports = new personnel_operations_controller ()
module.exports = new history_of_change_controller ()