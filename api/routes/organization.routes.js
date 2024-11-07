const Router = require (`express`)
const router = new Router()
const organizationController = require('../controller/organization.controller')

router.post ('/Organization', organizationController.createOrganization)
router.get ('/Organization', organizationController.getOrganization)
router.get ('/Organization/IdOrganization', organizationController.getOneOrganization)
router.put ('/Organization', organizationController.updateOrganization)
router.delete ('/Organization/IdOrganization', organizationController.deleteOrganization)

module.exports = router