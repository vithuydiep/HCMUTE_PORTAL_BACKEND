const Slider = require('../models/slider.model')
const httpStatus = require('http-status')
const ApiError = require('../../utils/api-error')

const getListSlider = async () => {
    return Slider.find({})
}

const createSlider = async (req) => {
    const formData = req.body
    const newSlider = new Slider(formData)
    return newSlider.save()
}

const getSliderByID = async (req) => {
    const id = req.params.slug
    return Slider.findById(id)
}

const updateSlider = async (req) => {
    const data = req.body
    return await Slider.findOneAndUpdate({ _id: data._id }, data, { new: true })
}

const deleteSlider = async (req) => {
    return await Slider.delete({ _id: req.params.id })
}

module.exports = {
    getListSlider,
    createSlider,
    getSliderByID,
    updateSlider,
    deleteSlider,
}
