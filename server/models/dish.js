const mongoose = require("mongoose");
const { Schema } = mongoose;

const dishSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    isVeg: {
        type: Boolean,
        required: true
    },
    type: {
        type: String,
        required: true
    },                      
    img: String,
    price: {
        type: Number,
        required: true
    },
    cityId:{
        type:String,
        required: true,
    },
    hotelId: {
        type: String,
        required: true
    },       
    createdAt: {                   
        type: Date,
        default: Date.now()
    },
    ratings:{
        type:Number,
        default:0
    },      
    numberofRatings:{
        type:Number,
        default:0
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
});
module.exports = mongoose.model('dish', dishSchema );