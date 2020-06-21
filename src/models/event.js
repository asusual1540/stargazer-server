const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20
    },
    date: {
        type: Number,
        minlength: 3,
        maxlength: 100
    },
    month: {
        type: String,
        minlength: 3,
        maxlength: 100
    },
    description: {
        type: String,
        minlength: 3,
        maxlength: 100
    },
    type: {
        type: String,
        minlength: 3,
        maxlength: 100
    },
    location: {
        type: String,
        minlength: 3,
        maxlength: 500
    },
    images: [
        {
            type: String,
            minlength: 3,
            maxlength: 600
        }
    ],

    date: {
        type: Date,
        default: Date.now
    }
})

const Event = mongoose.model("Event", eventSchema)

module.exports = Event