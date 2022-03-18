const Activitys = require('../models/activity.model')
const ApiError = require('../../utils/api-error')
const e = require('express')
const { Activity } = require('../models')
const { User } = require('../models')
const { createUser } = require('./user.service')

const getAllListActivities = async () => {
    return Promise.all([
        Activitys.find({ tag: 'dao-duc' }).limit(8).sort({ createdDate: -1 }),
        Activitys.find({ tag: 'hoc-tap' }).limit(5).sort({ createdDate: -1 }),
        Activitys.find({ tag: 'the-luc' }).limit(8).sort({ createdDate: -1 }),
        Activitys.find({ tag: 'tinh-nguyen' }).limit(8).sort({ createdDate: -1 }),
        Activitys.find({ tag: 'hoi-nhap' }).limit(8).sort({ createdDate: -1 }),
        Activitys.find({ tag: 'khac' }).limit(8).sort({ createdDate: -1 }),
    ])
}
const getLisActivitiesByPage = async (req) => {
    var page = req.query.page
    var limit = req.query.limit
    var slug = req.query.slug
    if (page < 1) {
        page = 1
    }
    if (slug) {
        var skipPage = (parseInt(page) - 1) * parseInt(limit)
        return Activitys.find({ tag: slug }).sort({ createdDate: -1 }).skip(skipPage).limit(parseInt(limit))
    } else {
        var skipPage = (parseInt(page) - 1) * parseInt(limit)
        return Activitys.find({}).sort({ createdDate: -1 }).skip(skipPage).limit(parseInt(limit))
    }
}
const getActivitiesByTag = async (req) => {
    return Activitys.find({ tag: req.query.tag }).sort({ createdDate: -1 }).limit(3)
}

const getActivity = async (req) => {
    return Activitys.findOne({ slug: req.params.slug })
}

const getTotalActivities = async (req, res) => {
    var slug = req.params.slug
    if (slug === 'undefined') {
        return Activitys.count({})
    }
    return Activitys.count({ tag: slug })
}
const addActivity = async (req, res) => {
    const formData = req.body
    if (req.userId === '61c45900eb10b1a42261c1ce') {
        formData.status = true
    }
    formData.createdDate = Date.now()
    const newActivity = new Activitys(formData)
    return newActivity.save()
}
const AddregisterActivityForStudent = async (req, res) => {
    const idUser = req.body.idUserRegister
    idUser.createdDate = Date.now({})
    const userRegister = { idUserRegister: idUser }
    return Activity.findOneAndUpdate(
        { _id: req.body.Id_Activity },
        { $push: { participatingList: { $each: [userRegister], $position: 0 } } }
    )
}
const AddregisterUserForStudent = async (req, res) => {
    const idUser = req.body.idUserRegister
    const idActivity = req.body.Id_Activity
    idUser.createdDate = Date.now({})
    const activityRegister = { id_Activity: idActivity }
    const checkListAtivity = await User.findOne({ _id: idUser }).select('listActivity')
    for (let i = 0; i < checkListAtivity.listActivity.length; i++) {
        if (checkListAtivity.listActivity[i].id_Activity === idActivity) return 0
    }
    return User.findOneAndUpdate(
        { _id: req.body.idUserRegister },
        { $push: { listActivity: { $each: [activityRegister], $position: 0 } } }
    )
}
const getListActivityByUser = async (req, res) => {
    var page = req.query.page
    var limit = req.query.limit
    if (page < 1) {
        page = 1
    }

    var skipPage = (parseInt(page) - 1) * parseInt(limit)
    var start = parseInt(page) - 1 === 0 ? 0 : skipPage
    var end = start + parseInt(limit)
    var listIdActivity = []
    var listActivity = []
    const userCurrent = await User.findOne({ _id: req.query.idUser }).select('listActivity')

    for (let i = start; i < end; i++) {
        if (i < userCurrent.listActivity.length) listIdActivity.push(userCurrent.listActivity[i])
    }
    for (let j = 0; j < listIdActivity.length; j++) {
        let result = await Activity.findOne({ _id: listIdActivity[j].id_Activity })
        listActivity.push({
            checking: listIdActivity[j].checking,
            infoActivity: result,
        })
    }
    return listActivity
}
const getTotalActivitiesForUser = async (req, res) => {
    const total = await User.findOne({ _id: req.query.idUser }).select('listActivity')
    return total.listActivity.length
}
const editActivity = async (req, res) => {
    const { idActivity, ...formData } = req.body
    if (req.userId === '61c45900eb10b1a42261c1ce') {
        formData.status = true
    }
    // const newActivity = new Activitys(formData)
    return await Activitys.updateOne({ _id: idActivity }, formData, { new: true })
}
const deleteActivity = async (req) => {
    return await Activitys.delete({ _id: req.params.id })
}
const getActivityForAdmin = async (status) => {
    return await Activitys.find({ status: status })
}
const getTotalRequestActivityForAdmin = async () => {
    return await Activitys.count({ status: false })
}

const getListAttendance = async (req) => {
    return await Activitys.findOne({ slug: req.params.slug }).populate('participatingList.idUserRegister')
}

module.exports = {
    getAllListActivities,
    getLisActivitiesByPage,
    getActivitiesByTag,
    getActivity,
    getTotalActivities,
    addActivity,
    AddregisterActivityForStudent,
    AddregisterUserForStudent,
    getListActivityByUser,
    getTotalActivitiesForUser,
    editActivity,
    deleteActivity,
    getListAttendance,
    getActivityForAdmin,
    getTotalRequestActivityForAdmin,
}
