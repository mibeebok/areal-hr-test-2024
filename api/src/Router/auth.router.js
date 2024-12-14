const Router = require ('express')
const router = new Router()
const authController = require ("../Controller/auth.controller")

router.post ('/registration', authController.registration)
router.post('/login', authController.login)
router.post ('/user', authController.userRole)

module.exports = router