const mongoose = require("mongoose");
const { Schema } = mongoose;

const dishSchema = new Schema({
    name: String,
    isVeg: Boolean,
    type: String,            // Types of dish: Starters, MainCourse, Chineese, Salad, Bread, Curry , Soup,
                             // Drinks, Street dish, Desert and etc..
    price: Number,
    anyOffer: String,
    priceAfterOffer: Number,
    ratings: Number,
    hotelId: String,
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