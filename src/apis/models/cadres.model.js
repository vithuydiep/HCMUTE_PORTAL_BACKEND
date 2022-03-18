const mongoose = require('mongoose')

const cadresSchema = mongoose.Schema(
    {
        name: { type: String, require: true },
        cadreslist: [
            {
                name: { type: String, require: true },
                position: { type: String, require: true },
                description: { type: String, require: true },
                picture: { type: String, require: true },
                contact: {
                    facebook: { type: String, require: true },
                    email: { type: String, require: true },
                    instagram: { type: String, require: true },
                },
            },
        ],
    },
    {
        timestamps: true,
    }
)
module.exports = mongoose.model('Cadres', cadresSchema)
