const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const validator = require('validator')
const mongooseDelete = require('mongoose-delete')

const { toJSON, paginate } = require('./plugins')

const userSchema = mongoose.Schema(
    {
        displayName: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error('Invalid email')
                }
            },
        },
        password: {
            type: String,
            require: true,
            trim: true,
            minlength: 6,
            validate(value) {
                if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
                    throw new Error('Password must contain at least one letter and one number')
                }
            },
            private: true,
        },
        // 3 Role:
        // "admin"
        // "unionBase"
        // "ssociationsBase"
        // "student"
        role: {
            type: String,
            required: true,
            trim: true,
        },
        isEmailVerified: {
            type: Boolean,
            default: false,
        },
        picture: {
            type: String,
            default: null,
        },
        fullName: {
            type: String,
            default: null,
        },
        phone: {
            type: String,
            default: null,
        },
        dateOfBirth: {
            type: String,
            default: null,
        },
        address: {
            type: String,
            default: null,
        },
        listActivity: [
            {
                id_Activity: String,
                checking: { type: String, default: false },
            },
        ],
    },
    {
        timestamps: true,
    }
)

userSchema.plugin(toJSON)
userSchema.plugin(paginate)

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
    const user = await this.findOne({ email, _id: { $ne: excludeUserId } })
    return !!user
}

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
userSchema.methods.isPasswordMatch = async function (password) {
    const user = this
    return bcrypt.compare(password, user.password)
}

userSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 10)
    }
    next()
})

/**
 * @typedef User
 */

userSchema.plugin(mongooseDelete, { overrideMethods: 'all', deletedAt: true })
const User = mongoose.model('User', userSchema)

module.exports = User
