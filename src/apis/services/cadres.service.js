const Cadres = require('../models/cadres.model')
const httpStatus = require('http-status')
const ApiError = require('../../utils/api-error')

const getListCadres = async () => {
    return Cadres.find({})
}

module.exports = {
    getListCadres,
}
