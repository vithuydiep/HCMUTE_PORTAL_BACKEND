const express = require('express')
const { cadresController } = require('../../controllers')

const router = express.Router()

router.get('/', cadresController.loadListCadres)

module.exports = router
