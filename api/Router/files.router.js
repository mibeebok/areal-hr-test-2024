const Router = require ('express')
const router = new Router()
const files_controller = require('../Controller/files.controller')

//Files
router.post('/files',files_controller.create_files)
router.get('/files',files_controller.get_files)
router.get('/files/:id',files_controller.get_one_files)
router.put('/files',files_controller.update_files)
router.delete('/files/:id',files_controller.delete_files)

module.exports = router