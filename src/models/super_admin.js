const mongoose = require('mongoose')

const super_adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20
    },
    password: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100
    },
    accessType: {
        type: Number,
        default: 1
    },
    myAdmins: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Admin'
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
})

const SuperAdmin = mongoose.model("SuperAdmin", super_adminSchema)

module.exports = SuperAdmin