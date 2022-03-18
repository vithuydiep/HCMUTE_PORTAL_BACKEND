const express = require('express')

const authRoute = require('./v1/auth.route')
const userRoute = require('./v1/user.route')
const cadresRoute = require('./v1/cadres.route')
const newsRoute = require('./v1/news.route')
const activityRoute = require('./v1/activity.route')
const sliderRoute = require('./v1/slider.route')
const { activityService } = require('../services')

const router = express.Router()

const defaultRoutes = [
    {
        path: '/v1/auth',
        route: authRoute,
    },
    {
        path: '/v1/users',
        route: userRoute,
    },
    {
        path: '/v1/cadres',
        route: cadresRoute,
    },
    {
        path: '/v1/news',
        route: newsRoute,
    },
    {
        path: '/v1/activitys',
        route: activityRoute,
    },
    {
        path: '/v1/slider',
        route: sliderRoute,
    },
]

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route)
})

module.exports = router
