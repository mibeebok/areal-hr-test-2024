const Router = require ('express')
const router = new Router()
const organization_controller = require('../Controller/orgsnization.controller')

//Organization
router.post ('/organization',organization_controller.create_organization)
router.get ('/organization',organization_controller.get_organization)
router.get ('/organization/:id',organization_controller.get_one_organization)
router.put ('/organization',organization_controller.update_organization)
router.delete ('/organization/:id',organization_controller.delete_organization)

module.exports = router