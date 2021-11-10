const mongoose = require("mongoose");
const { Schema } = mongoose;

const loginCredential = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    isHotel: Boolean,
    isAdmin: Boolean,
    isDileveryBoy: Boolean,
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('loginCredential',  loginCredential);