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
    },                       // Types of dish: Starters, MainCourse, Chineese, Salad, Bread, Curry , Soup,
                             // Drinks, Street dish, Desert and etc..
    img: String,
    price: {
        type: Number,
        required: true
    },
    centerId:{
        type:string,
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
    updatedAt: {
        type: Date,
        default: Date.now()
    }
});
module.exports = mongoose.model('dish', dishSchema );