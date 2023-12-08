const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    friends:{
        type: Array,
        required: true
    },
    requests: {
        type: Array,
        required: true
    },
    token: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('User', userSchema)