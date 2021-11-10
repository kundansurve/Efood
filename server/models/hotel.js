const mongoose = require("mongoose");
const { Schema } = mongoose;

const hotelSchema = new Schema({
    email: {
        type: String,               //email of that Hotel
        required: true,
        unique: true
    },
    Name: String,
    City:{
        type:String
    },
    Adress: {
        type:String,                // Adress of that Hotel
        required
    },
    addressCoordinates:{
        type:Array,                 //Array of Longitudes and Latitudes 
        required: true              //of that Hotel on map
    },
    dish:{
        type:Array,                 //Array of all object _id of dish 
        default:[]                  //that are offered by that hotel
    },
    Orders:{
        type:Array,                 //Array of all object _id of Orders
        default:[]                  //that are placed in that hotel
    },
    ratings:Number,
    reviews:{
        type:Array,                 //Array of all object _id of Reviews
        default:[]                  // of that hotel
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

module.exports = mongoose.model('Hotel',  hotelSchema);