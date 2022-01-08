const mongoose = require("mongoose");
const { Schema } = mongoose;

const centers = new Schema({
    email: {
        type: String,               //email of that Hotel
        required: true,
        unique: true
    },
    address:{
        type: String,               //email of that Hotel
        required: true,
        unique: true
    },
    locationCoordinates:{
        type:Array,
        required: true,
        unique: true
    },
    hotels:{
        type:Array,
        required: true,
        unique: true
    },
    deliveryBoys:{
        type:Array,
        required: true,
        unique: true
    },
    createdAt: {                   
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
})
module.exports = mongoose.model('centers', centers );