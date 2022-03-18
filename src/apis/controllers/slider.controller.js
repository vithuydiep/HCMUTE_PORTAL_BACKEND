const catchAsync = require('../../utils/catch-async')
const httpStatus = require('http-status')
const sliderService = require('../services/slider.service')

const loadListSlider = catchAsync(async (req, res) => {
    await sliderService
        .getListSlider()
        .then((data) => {
            res.status(200).json(data)
        })
        .catch((err) => {
            res.status(500).json('lỗi server')
        })
})

const createSlider = catchAsync(async (req, res) => {
    await sliderService
        .createSlider(req)
        .then((data) => {
            res.status(200).json(data)
        })
        .catch((err) => {
            res.status(500).json('lỗi server')
        })
})

const getSliderById = catchAsync(async (req, res) => {
    await sliderService
        .getSliderByID(req)
        .then((data) => {
            res.status(200).json(data)
        })
        .catch((err) => {
            res.status(500).json('lỗi server')
        })
})

const updateSlider = catchAsync(async (req, res) => {
    await sliderService
        .updateSlider(req)
        .then((data) => {
            res.status(200).json(data)
        })
        .catch((err) => {
            res.status(500).json('lỗi server')
        })
})

const deleteSlider = catchAsync(async (req, res) => {
    await sliderService
        .deleteSlider(req)
        .then((data) => {
            res.status(200).json(data)
        })
        .catch((err) => {
            res.status(500).json('lỗi server')
        })
})

module.exports = {
    createSlider,
    loadListSlider,
    getSliderById,
    updateSlider,
    deleteSlider,
}
