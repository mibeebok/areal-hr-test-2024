const Router = require ('express')
const router = new Router()
const personnel_operations_controller = require('../Controller/personnel_operations.controller')

router.get('/', (req, res) => {
    res.send('Welcome to the Personnel operations API');
});

//Personnel operations
router.post('/personnel_operations',personnel_operations_controller.createPersonnelOperations)
router.get('/personnel_operations',personnel_operations_controller.getPersonnelOperations)
router.get('/personnel_operations/:id',personnel_operations_controller.getOnePersonnelOperations)
router.put('/personnel_operations',personnel_operations_controller.updatePersonnelOperations)
router.delete('/personnel_operations/:id',personnel_operations_controller.deletePersonnelOperations)
router.patch('/personnel_operations/:id',personnel_operations_controller.softDeleteEmployees)

module.exports = router