const catchAsync = require('../../utils/catch-async')
const httpStatus = require('http-status')
const { newsService } = require('../services')

const loadListNews = catchAsync(async (req, res) => {
    var page = req.query.page
    var tag = req.query.tag
    if (page) {
        newsService
            .getListNewsByPage(req)
            .then((data) => {
                res.json(data)
            })
            .catch((err) => {
                res.status(500).json('lỗi server')
            })
    } else if (tag) {
        newsService
            .getNewsByTag(req, res)
            .then((data) => {
                res.json(data)
            })
            .catch((err) => {
                res.status(500).json('lỗi server')
            })
    } else {
        newsService
            .getAllListNews()
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
    newsService
        .getNews(req, res)
        .then((data) => {
            res.status(200).json(data)
        })
        .catch((err) => {
            res.status(500).json('lỗi server')
        })
})

const getTotalPage = catchAsync(async (req, res) => {
    newsService
        .getTotalNews(req, res)
        .then((data) => {
            res.status(200).json(data)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json('lỗi server')
        })
})

const addNews = catchAsync(async (req, res) => {
    if (!req.userId) return res.json({ message: 'Unauthenticated' })
    newsService
        .addNews(req, res)
        .then((data) => {
            res.status(200).json(data)
        })
        .catch((err) => {
            res.status(500).json('lỗi server')
        })
})

const getNewsForAdmin = catchAsync(async (req, res) => {
    var status = req.query.status
    newsService
        .getNewsForAdmin(status)
        .then((data) => {
            res.status(200).json(data)
        })
        .catch((err) => {
            res.status(500).json('lỗi server')
        })
})

const deleteNews = async (req, res) => {
    newsService
        .deleteNews(req)
        .then((data) => {
            res.status(200).json(data)
        })
        .catch((err) => {
            res.status(500).json('lỗi server')
        })
}

const updateNews = async (req, res) => {
    newsService
        .updateNews(req)
        .then((data) => {
            res.status(200).json(data)
        })
        .catch((error) => {
            res.status(500).json('lỗi server')
        })
}

const getTotalRequest = async (req, res) => {
    newsService
        .getTotalRequestForAdmin()
        .then((data) => {
            res.status(200).json(data)
        })
        .catch((error) => {
            res.status(500).json('lỗi server')
        })
}

const getNewsByUser = async (req, res) => {
    if (!req.userId) return res.status(401).json({ message: 'Unauthenticated' })
    newsService
        .getNewsByUser(req.userId)
        .then((data) => {
            res.status(200).json(data)
        })
        .catch((error) => {
            res.status(500).json('lỗi server')
        })
}

module.exports = {
    loadListNews,
    show,
    getTotalPage,
    addNews,
    getNewsForAdmin,
    deleteNews,
    updateNews,
    getTotalRequest,
    getNewsByUser,
}
