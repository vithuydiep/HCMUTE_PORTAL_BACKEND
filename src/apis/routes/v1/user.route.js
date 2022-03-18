const express = require('express')
const { userController } = require('../../controllers')
const auth = require('../../../middlewares/auth')

const router = express.Router()

router.get('/getUsersForAdmin', userController.getUsersForAdmin)
router.get('/getUserEditForAdmin/:id', userController.getUserEditForAdmin)
router.get('/info', auth, userController.getUserById)
router.put('/info', auth, userController.updateUserById)
router.post('/checking', userController.checkingUser)
router.put('/', auth, userController.updateUsersForAdmin)
router.delete('/:id', userController.deleteUsers)
router.put('/updateInfoUserEditAdmin', auth, userController.updateInfoUserEditAdmin)
router.post('/', auth, userController.addUsers)

module.exports = router

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and retrieval
 */
