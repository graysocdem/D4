const Post = require('./Post')

const mongoose = require('mongoose')

const pageSchema = new mongoose.Schema({
    owner: {
        type: String,
        required: true,
    },
    posts: {
        type: Array,
        required: true
    }
})

module.exports = mongoose.model('Page', pageSchema)

