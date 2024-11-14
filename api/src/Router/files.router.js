const Router = require ('express')
const router = new Router()
const files_controller = require('../Controller/files.controller')

router.get('/', (req, res) => {
    res.send('Welcome to the Files API');
});

//Files
router.post('/files',files_controller.createFiles)
router.get('/files',files_controller.getFiles)
router.get('/files/:id',files_controller.getOneFiles)
router.put('/files',files_controller.updateFiles)
router.delete('/files/:id',files_controller.deleteFiles)

module.exports = router