const Router = require ('express')
const router = new Router()
const personnel_operations_controller = require('../Controller/personnel_operations.controller')

//Personnel operations
router.post('/personnel_operations',personnel_operations_controller.create_personnel_operations)
router.get('/personnel_operations',personnel_operations_controller.get_personnel_operations)
router.get('/personnel_operations/:id',personnel_operations_controller.get_one_personnel_operations)
router.put('/personnel_operations',personnel_operations_controller.update_personnel_operations)
router.delete('/personnel_operations/:id',personnel_operations_controller.delete_personnel_operations)
router.patch('/personnel_operations/:id',personnel_operations_controller.soft_delete_employees)

module.exports = router