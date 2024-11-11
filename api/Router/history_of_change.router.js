const Router = require ('express')
const router = new Router()
const history_of_change_controller = require('../Controller/history_of_change.controller')

//History of change
router.post('/history_of_change',history_of_change_controller.create_history_of_change)
router.get('/history_of_change',history_of_change_controller.get_history_of_change)
router.get('/history_of_change/:id',history_of_change_controller.get_one_history_of_change)
router.put('/history_of_change',history_of_change_controller.update_history_of_change)
router.delete('/history_of_change/:id',history_of_change_controller.delete_history_of_change)

module.exports = router