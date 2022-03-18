const mongoose = require('mongoose')
const mongooseDelete = require('mongoose-delete')

const sliderSchema = mongoose.Schema(
    {
        title: { type: String, require: true },
        img: { type: String, require: true },
        link: { type: String, require: true },
    },
    {
        timestamps: true,
    }
)

sliderSchema.plugin(mongooseDelete, { overrideMethods: 'all', deletedAt: true })
module.exports = mongoose.model('sliders', sliderSchema)
