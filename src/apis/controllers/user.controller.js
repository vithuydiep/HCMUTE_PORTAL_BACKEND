const catchAsync = require('../../utils/catch-async')
const httpStatus = require('http-status')
const { userService } = require('../services')

const getUserById = catchAsync(async (req, res) => {
    if (!req.userId) return res.json({ message: 'Unauthenticated' })
    const id = req.userId
    userService
        .getUserById(id)
        .then((data) => {
            res.status(200).json(data)
        })
        .catch((err) => {
            res.status(500).json('lỗi server')
        })
})

const updateInfoUserEditAdmin = catchAsync(async (req, res) => {
    userService
        .updateInfoUserEditAdmin(req)
        .then((data) => {
            res.status(200).json(data)
        })
        .catch((err) => {
            res.status(500).json('lỗi server')
        })
})

const getUserEditForAdmin = catchAsync(async (req, res) => {
    // var id = req.query.id
    userService
        .getUserEditForAdmin(req, res)
        .then((data) => {
            res.status(200).json(data)
        })
        .catch((err) => {
            res.status(500).json('lỗi server')
        })
})

const updateUserById = catchAsync(async (req, res) => {
    if (!req.userId) return res.json({ message: 'Unauthenticated' })
    const data = req.body
    const id = req.userId
    userService
        .updateUserById(id, data)
        .then((data) => {
            res.status(200).json(data)
        })
        .catch((err) => {
            res.status(500).json('lỗi server')
        })
})
const updateUsersForAdmin = async (req, res) => {
    userService
        .updateUsersForAdmin(req)
        .then((data) => {
            res.status(200).json(data)
        })
        .catch((error) => {
            res.status(500).json('lỗi server')
        })
}
const deleteUsers = async (req, res) => {
    userService
        .deleteUsers(req)
        .then((data) => {
            res.status(200).json(data)
        })
        .catch((err) => {
            res.status(500).json('lỗi server')
        })
}
const getUsersForAdmin = catchAsync(async (req, res) => {
    var role = req.query.role
    userService
        .getUsersForAdmin(role)
        .then((data) => {
            res.status(200).json(data)
        })
        .catch((err) => {
            res.status(500).json('lỗi server')
        })
})

const checkingUser = catchAsync(async (req, res) => {
    userService
        .checkingUser(req, res)
        .then((data) => {
            res.status(200).json(data)
        })
        .catch((err) => {
            res.status(500).json('lỗi server')
        })
})

const addUsers = catchAsync(async (req, res) => {
    userService
        .addUsers(req, res)
        .then((data) => {
            res.status(200).json(data)
        })
        .catch((err) => {
            res.status(500).json('lỗi server')
        })
})

module.exports = {
    checkingUser,
    getUserById,
    updateUserById,
    getUsersForAdmin,
    updateUsersForAdmin,
    deleteUsers,
    getUserEditForAdmin,
    updateInfoUserEditAdmin,
    addUsers,
}
