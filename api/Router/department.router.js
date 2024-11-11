const Router = require ('express')
const router = new Router()
const department_controller = require('../Controller/department.controller')

//Department
router.post ('/departments',department_controller.create_departments)
router.get ('/departments',department_controller.get_departments)
router.get ('/departments/:id',department_controller.get_one_departments)
router.put ('/departments',department_controller.update_departments)
router.delete ('/departments/:id',department_controller.delete_departments)

module.exports = router