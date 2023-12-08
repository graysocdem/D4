const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    timestamp: {
        type: String,
        required: true
    }

})

module.exports = mongoose.model('Post', postSchema)
