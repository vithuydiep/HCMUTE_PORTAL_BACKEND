const catchAsync = require('../../utils/catch-async')
const httpStatus = require('http-status')
const { cadresService } = require('../services')

const loadListCadres = catchAsync(async (req, res) => {
    await cadresService
        .getListCadres()
        .then((data) => {
            res.status(200).json(data)
        })
        .catch((err) => {
            res.status(500).json('lỗi server')
        })
})

module.exports = {
    loadListCadres,
}
