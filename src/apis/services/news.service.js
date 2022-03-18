const News = require('../models/news.model')

const getAllListNews = async () => {
    return Promise.all([
        News.find({ tag: 'tin-noi-bat', status: true }).limit(8).sort({ createdDate: -1 }),
        News.find({ tag: 'thong-tin-thong-bao', status: true }).limit(5).sort({ createdDate: -1 }),
        News.find({ tag: 'chuong-trinh-hoat-dong', status: true }).limit(5).sort({ createdDate: -1 }),
        News.find({ tag: 'hoc-tap-nghien-cuu', status: true }).limit(5).sort({ createdDate: -1 }),
        News.find({ tag: 'thong-tin-chung', status: true }).limit(5).sort({ createdDate: -1 }),
        News.find({ tag: 'tin-ute', status: true }).limit(5).sort({ createdDate: -1 }),
    ])
}

const getNewsForAdmin = async (status) => {
    if (status) {
        return await News.find({ status: status })
    }
    return await News.find({ status: true })
}

const getTotalRequestForAdmin = async () => {
    return await News.count({ status: false })
}

const getListNewsByPage = async (req) => {
    var page = req.query.page
    var limit = req.query.limit
    var slug = req.query.slug
    var search = req.query.search

    if (page < 1) {
        page = 1
    }
    if (slug) {
        var skipPage = (parseInt(page) - 1) * parseInt(limit)
        return News.find({ tag: slug, status: true }).sort({ createdDate: -1 }).skip(skipPage).limit(parseInt(limit))
    } else if (search) {
        var skipPage = (parseInt(page) - 1) * parseInt(limit)
        return News.find({ status: true, title: { $regex: new RegExp(search, 'i') } })
            .sort({ createdDate: -1 })
            .skip(skipPage)
            .limit(parseInt(limit))
    } else {
        var skipPage = (parseInt(page) - 1) * parseInt(limit)
        return News.find({ status: true }).sort({ createdDate: -1 }).skip(skipPage).limit(parseInt(limit))
    }
}
const getNewsByTag = async (req) => {
    return News.find({ tag: req.query.tag, status: true }).sort({ createdDate: -1 }).limit(3)
}

const getNews = async (req) => {
    return News.findOne({ slug: req.params.slug })
}

const getTotalNews = async (req, res) => {
    var slug = req.query.slug
    var search = req.query.search
    if (search) {
        return News.find({ status: true, title: { $regex: new RegExp(search, 'i') } }).count()
    }
    if (slug === undefined) {
        return News.count({})
    }
    return News.count({ tag: slug })
}

const addNews = async (req) => {
    const formData = req.body
    if (req.userId === '61c45900eb10b1a42261c1ce') {
        formData.status = true
    }
    formData.createdUser = req.userId
    formData.createdDate = Date.now()
    const newNews = new News(formData)
    return newNews.save()
}

const deleteNews = async (req) => {
    return await News.delete({ _id: req.params.id })
}

const updateNews = async (req) => {
    const data = req.body
    if (req.userId === '61c45900eb10b1a42261c1ce') {
        data.status = true
    }
    return await News.updateOne({ _id: data._id }, data, { new: true })
}

const getNewsByUser = async (id) => {
    return await News.find({ createdUser: id })
}

module.exports = {
    getNews,
    getAllListNews,
    getListNewsByPage,
    getTotalNews,
    getNewsByTag,
    addNews,
    getNewsForAdmin,
    deleteNews,
    updateNews,
    getTotalRequestForAdmin,
    getNewsByUser,
}
