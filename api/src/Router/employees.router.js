const Router = require ('express')
const router = new Router()
const employees_controller = require('../Controller/employees.controller')

router.get('/', (req, res) => {
    res.send('Welcome to the Employees API');
});

//Employees
router.post('/employees',employees_controller.createEmployees)
router.get('/employees',employees_controller.getEmployees)
router.get('/employees/:id',employees_controller.getOneEmployees)
router.put('/employees',employees_controller.updateEmployees)
router.delete('/employees/:id',employees_controller.deleteEmployees)

module.exports = router