const Router = require ('express')
const router = new Router()
const position_controller = require('../Controller/position.controller')

//Position
router.post('/positions',position_controller.create_positions)
router.get('/positions',position_controller.get_positions)
router.get('/positions/:id',position_controller.get_one_positions)
router.put('/positions',position_controller.update_positions)
router.delete('/positions/:id',position_controller.delete_positions)

module.exports = router