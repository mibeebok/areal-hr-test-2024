const Router = require ('express')
const router = new Router()
const employees_controller = require('../Controller/employees.controller')

//Employees
router.post('/employees',employees_controller.create_employees)
router.get('/employees',employees_controller.get_employees)
router.get('/employees/:id',employees_controller.get_one_employees)
router.put('/employees',employees_controller.update_employees)
router.delete('/employees/:id',employees_controller.delete_employees)

module.exports = router