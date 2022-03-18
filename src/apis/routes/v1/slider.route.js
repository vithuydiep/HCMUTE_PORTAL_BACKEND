const express = require('express')
const auth = require('../../../middlewares/auth')
const sliderController = require('../../controllers/slider.controller')

const router = express.Router()

router.get('/getListSlider', sliderController.loadListSlider)
router.post('/add-slider', sliderController.createSlider)
router.get('/:slug', sliderController.getSliderById)
router.put('/update', sliderController.updateSlider)
router.delete('/:id', sliderController.deleteSlider)

module.exports = router

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and retrieval
 */
