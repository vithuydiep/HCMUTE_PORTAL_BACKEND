const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
const mongooseDelete = require('mongoose-delete')

const newsSchema = mongoose.Schema(
    {
        nameActivity: { type: String, require: true },
        createdDate: { type: Date, require: true },
        startDate: { type: Date, require: true },
        endDate: { type: Date, require: true },
        place: { type: String, require: true },
        benefit: { type: String, require: true },
        description: { type: String, require: true },
        social: { type: String, require: true },
        thumbnail: { type: String },
        tag: { type: String },
        namePerson: { type: String, require: true },
        regency: { type: String, require: true },
        phone: { type: String, require: true },
        userCreate: { type: String, require: true },
        slug: { type: String, slug: 'nameActivity', unique: true },
        participatingList: [
            {
                idUserRegister: { type: String, ref: 'User' },
            },
        ],
        status: { type: Boolean,default: false}
    },
    {
        timestamps: true,
    }
)
mongoose.plugin(slug)
newsSchema.plugin(mongooseDelete, { overrideMethods: 'all', deletedAt: true })

module.exports = mongoose.model('activities', newsSchema)
