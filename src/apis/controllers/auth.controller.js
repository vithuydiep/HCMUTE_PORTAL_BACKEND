const httpStatus = require('http-status')
const { OAuth2Client } = require('google-auth-library')
const catchAsync = require('../../utils/catch-async')
const { authService, tokenService, userService } = require('../services')
const { response } = require('express')
const { User } = require('../models')
const { Console } = require('winston/lib/winston/transports')
const client = new OAuth2Client('104143514072-mqfqcs527rvo4skvgookfb8apdrujvgg.apps.googleusercontent.com')

const register = catchAsync(async (req, res) => {
    console.log(req.body)
    const user = await userService.createUser(req.body)
    const tokens = await tokenService.generateAuthTokens(user)
    res.status(httpStatus.CREATED).send({ user, tokens })
})

const login = catchAsync(async (req, res) => {
    const { email, password } = req.body
    const user = await authService.loginUserWithEmailAndPassword(email, password)
    const tokens = await tokenService.generateAuthTokens(user)
    res.send({ user, tokens })
})

const logout = catchAsync(async (req, res) => {
    await authService.logout(req.body.refreshToken)
    res.status(httpStatus.NO_CONTENT).send()
})

const refreshTokens = catchAsync(async (req, res) => {
    const tokens = await authService.refreshAuth(req.body.refreshToken)
    res.send({ ...tokens })
})

const forgotPassword = catchAsync(async (req, res) => {
    const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email)
    await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken)
    res.status(httpStatus.NO_CONTENT).send()
})

const resetPassword = catchAsync(async (req, res) => {
    await authService.resetPassword(req.query.token, req.body.password)
    res.status(httpStatus.NO_CONTENT).send()
})

const sendVerificationEmail = catchAsync(async (req, res) => {
    const verifyEmailToken = await tokenService.generateVerifyEmailToken(req.user)
    await emailService.sendVerificationEmail(req.user.email, verifyEmailToken)
    res.status(httpStatus.NO_CONTENT).send()
})

const verifyEmail = catchAsync(async (req, res) => {
    await authService.verifyEmail(req.query.token)
    res.status(httpStatus.NO_CONTENT).send()
})

const loginGoogle = catchAsync(async (req, res) => {
    const { tokenId } = req.body
    await client
        .verifyIdToken({
            idToken: tokenId,
            audience: '104143514072-mqfqcs527rvo4skvgookfb8apdrujvgg.apps.googleusercontent.com',
        })
        .then((response) => {
            const { email_verified, name, email, picture } = response.payload
            if (email_verified) {
                User.findOne({ email }).exec(async (err, usercheck) => {
                    if (err) {
                        res.status(400).json({
                            error: 'Some thing went wrong....',
                        })
                    } else {
                        if (usercheck) {
                            const user = await authService.loginUserWithEmailAndPassword(email, 'hcmute123')
                            const tokens = await tokenService.generateAuthTokens(user)
                            res.status(httpStatus.CREATED).send({ user, tokens })
                        } else {
                            const footEmail = email.split('@')
                            let role
                            if (footEmail[1] === 'student.hcmute.edu.vn') {
                                role = 'user:student'
                            } else if (footEmail[1] === 'hcmute.edu.vn') {
                                role = 'user:unionBase'
                            } else {
                                return res.status(222).send('Đăng nhập vào bằng email sinh viên')
                            }
                            const data = { displayName: name, email, role, picture, password: 'hcmute123' }
                            const user = await userService.createUser(data)
                            const tokens = await tokenService.generateAuthTokens(user)
                            res.status(httpStatus.CREATED).send({ user, tokens })
                        }
                    }
                })
            } else {
                res.status(500).json('Email không tồn tại!')
            }
        })
})

module.exports = {
    register,
    login,
    logout,
    refreshTokens,
    forgotPassword,
    resetPassword,
    sendVerificationEmail,
    verifyEmail,
    loginGoogle,
}
