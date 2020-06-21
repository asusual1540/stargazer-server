const mongoose = require('mongoose')

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20
    },
    title: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100
    },
    text: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20000
    },

    date: {
        type: Date,
        default: Date.now
    }
})

const Author = mongoose.model("Author", authorSchema)

module.exports = Author