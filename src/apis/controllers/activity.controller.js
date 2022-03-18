const catchAsync = require('../../utils/catch-async')
const { activityService } = require('../services')

const loadListActivity = catchAsync(async (req, res) => {
    var page = req.query.page
    var tag = req.query.tag
    if (page) {
        activityService
            .getLisActivitiesByPage(req)
            .then((data) => {
                res.json(data)
            })
            .catch((err) => {
                res.status(500).json('lỗi server')
            })
    } else if (tag) {
        activityService
            .getActivitiesByTag(req, res)
            .then((data) => {
                res.json(data)
            })
            .catch((err) => {
                res.status(500).json('lỗi server')
            })
    } else {
        activityService
            .getAllListActivities()
            .then((data) => {
                const [a, b, c, d, e, f] = data
                const resData = a.concat(b, c, d, e, f)
                res.json(resData)
            })
            .catch((error) => {
                res.status(500).json('lỗi server')
            })
    }
})

const show = catchAsync(async (req, res) => {
    activityService
        .getActivity(req, res)
        .then((data) => {
            res.status(200).json(data)
        })
        .catch((err) => {
            res.status(500).json('lỗi server')
        })
})

const getTotalActivity = catchAsync(async (req, res) => {
    activityService
        .getTotalActivities(req, res)
        .then((data) => {
            res.status(200).json(data)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json('lỗi server')
        })
})

const createActivity = catchAsync(async (req, res) => {
    activityService
        .addActivity(req, res)
        .then((data) => {
            res.status(200).json(data)
        })
        .catch((err) => {
            res.status(500).json('lỗi server')
        })
})

const registerActivityForStudent = catchAsync(async (req, res) => {
    activityService
        .AddregisterUserForStudent(req, res)
        .then((data) => {
            if (data == 0) {
                res.status(200).json('false')
            } else {
                activityService
                    .AddregisterActivityForStudent(req, res)
                    .then((data) => {
                        if (data) {
                            res.status(200).json('true')
                        }
                    })
                    .catch((err) => {
                        res.status(500).json('lỗi server')
                    })
            }
        })
        .catch((err) => {
            res.status(500).json('lỗi server')
        })
})
const getListActivityByUser = catchAsync(async (req, res) => {
    activityService
        .getListActivityByUser(req, res)
        .then((data) => {
            res.status(200).json(data)
        })
        .catch((err) => {
            res.status(500).json('lỗi server')
        })
})
const getTotalActivityForUser = catchAsync(async (req, res) => {
    activityService
        .getTotalActivitiesForUser(req, res)
        .then((data) => {
            res.status(200).json(data)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json('lỗi server')
        })
})
const getAllListActivityByAdmin = catchAsync(async (req, res) => {
    activityService
        .getAllListActivities()
        .then((data) => {
            const [a, b, c, d, e, f] = data
            const resData = a.concat(b, c, d, e, f)
            res.json(resData)
        })
        .catch((error) => {
            res.status(500).json('lỗi server')
        })
})

const editActivity = catchAsync(async (req, res) => {
    activityService
        .editActivity(req, res)
        .then((data) => {
            res.status(200).json(data)
        })
        .catch((err) => {
            res.status(500).json('lỗi server')
        })
})
const deleteActivity = async (req, res) => {
    activityService
        .deleteActivity(req)
        .then((data) => {
            res.status(200).json(data)
        })
        .catch((err) => {
            res.status(500).json('lỗi server')
        })
}

const getListAttendance = catchAsync(async (req, res) => {
    activityService
        .getListAttendance(req, res)
        .then((data) => {
            res.status(200).json(data)
        })
        .catch((err) => {
            res.status(500).json('lỗi server')
        })
})
const getActivityForAdmin = catchAsync(async (req, res) => {
    var status = req.query.status
    console.log(status)
    activityService
        .getActivityForAdmin(status)
        .then((data) => {
            res.status(200).json(data)
        })
        .catch((err) => {
            res.status(500).json('lỗi server')
        })
})
const getTotalRequestAcivity = async (req, res) => {
    activityService
        .getTotalRequestActivityForAdmin()
        .then((data) => {
            res.status(200).json(data)
        })
        .catch((error) => {
            res.status(500).json('lỗi server')
        })
}
module.exports = {
    loadListActivity,
    show,
    getTotalActivity,
    createActivity,
    registerActivityForStudent,
    getListActivityByUser,
    getTotalActivityForUser,
    getAllListActivityByAdmin,
    editActivity,
    deleteActivity,
    getListAttendance,
    getActivityForAdmin,
    getTotalRequestAcivity
}
