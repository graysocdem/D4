const mongoose = require('mongoose')

const chatSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    messages: {
        type: Array,
        required: true
    },
})

module.exports = mongoose.model('Chat', chatSchema)
