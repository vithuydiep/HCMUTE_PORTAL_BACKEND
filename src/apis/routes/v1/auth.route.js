const express = require('express')

const { authController } = require('../../controllers')
const { authValidation } = require('../../validations')

const validate = require('../../../middlewares/validate')
const auth = require('../../../middlewares/auth')
const router = express.Router()

router.post('/login', authController.login)
router.post('/logout', validate(authValidation.logoutSchema), authController.logout)
router.post('/register', validate(authValidation.registerSchema), authController.register)
router.post('/logingoogle', authController.loginGoogle)
router.post('/refreshToken', authController.refreshTokens)

module.exports = router
