const httpStatus = require('http-status')

const ApiError = require('../../utils/api-error')
const { User } = require('../models')
const { replaceOne } = require('../models/token.model')

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
    console.log(userBody)
    if (await User.isEmailTaken(userBody.email)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken')
    }
    return User.create(userBody)
}

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
    return User.findOne({ email })
}

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
    return User.findById(id)
}

const updateUserById = async (id, data) => {
    return await User.findOneAndUpdate({ _id: id }, data, { new: true })
}

const getUsersForAdmin = async (role) => {
    if (role) {
        return await User.find({ role: role })
    }
    return await User.find({ role: 'user:unionBase' })
    // const data = await User.find({})
    // const new_arr = data.filter((data) => data.role !== 'admin')
    // return new_arr
}

const deleteUsers = async (req) => {
    return await User.delete({ _id: req.params.id })
}

const updateUsersForAdmin = async (req) => {
    const data = req.body
    if (req.userId === '61c45900eb10b1a42261c1ce') {
        data.status = true
    }
    return await User.updateOne({ _id: data._id }, data, { new: true })
}

const checkingUser = async (req, res) => {
    const { idUser, checking, idActivity } = req.body
    const value = checking === 'true' ? 'false' : 'true'
    return await User.updateOne(
        { _id: idUser, 'listActivity.id_Activity': idActivity },
        { $set: { 'listActivity.$.checking': value } },
        { new: true }
    )
}
const getUserEditForAdmin = async (req) => {
    return User.findOne({ _id: req.params.id })
}

const updateInfoUserEditAdmin = async (req) => {
    const { idUser, ...formData } = req.body
    return await User.updateOne({ _id: idUser }, formData, { new: true })
}

const addUsers = async (req) => {
    const formData = req.body
    const newUser = new User(formData, {displayName: req.body.fullname})
    const user = await createUser(newUser)
    return user
}

module.exports = {
    checkingUser,
    createUser,
    getUserByEmail,
    getUserById,
    updateUserById,
    getUsersForAdmin,
    updateUsersForAdmin,
    deleteUsers,
    getUserEditForAdmin,
    updateInfoUserEditAdmin,
    addUsers,
}
