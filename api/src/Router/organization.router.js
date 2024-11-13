const Router = require ('express')
const router = new Router()
const organization_controller = require('../Controller/organization.controller')

//Organization
router.post ('/organization',organization_controller.createOrganization)
router.get ('/organization',organization_controller.getOrganization)
router.get ('/organization/:id',organization_controller.getOneOrganization)
router.put ('/organization',organization_controller.updateOrganization)
router.delete ('/organization/:id',organization_controller.deleteOrganization)

module.exports = router