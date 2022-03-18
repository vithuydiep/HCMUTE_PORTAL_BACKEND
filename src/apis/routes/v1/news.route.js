const express = require('express')
const { newsController } = require('../../controllers')
const auth = require('../../../middlewares/auth')
const router = express.Router()

router.get('/total-request', auth, newsController.getTotalRequest)
router.get('/getNewsForAdmin', auth, newsController.getNewsForAdmin)
router.get('/total', newsController.getTotalPage)
router.get('/request-news', auth, newsController.getNewsByUser)
router.get('/:slug', newsController.show)
router.get('/', newsController.loadListNews)
router.post('/', auth, newsController.addNews)
router.delete('/:id', newsController.deleteNews)
router.put('/', auth, newsController.updateNews)

module.exports = router
