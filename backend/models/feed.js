const mongoose = require('mongoose')

const feedSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    createdBy: {
        type: String,
        required: true
    },
    class: {
        type: String,
        required: true
    }
},
    { timestamps: true })

const FEED = new mongoose.model('feed', feedSchema)
module.exports = FEED