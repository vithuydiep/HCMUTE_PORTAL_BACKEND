const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
const mongooseDelete = require('mongoose-delete')

const newsSchema = mongoose.Schema(
    {
        title: { type: String, require: true },
        createdDate: { type: Date, require: true },
        content: { type: String, require: true },
        tag: { type: String },
        name: { type: String, require: true },
        position: { type: String, require: true },
        thumbnail: { type: String },
        slug: { type: String, slug: 'title', unique: true },
        status: { type: Boolean, default: false },
        createdUser: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        timestamps: true,
    }
)
mongoose.plugin(slug)
newsSchema.plugin(mongooseDelete, { overrideMethods: 'all', deletedAt: true })

module.exports = mongoose.model('news', newsSchema)
