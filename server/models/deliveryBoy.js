const mongoose = require("mongoose");
const { Schema } = mongoose;

const deliveryBoy = new Schema({
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
        required: true              //of that DeliveryBoy on map
    },
    Orders:{
        type:Array,                 //Array of all object _id of Orders
        default:[]                  //that are delivered by that deliveryBoy
    },
    reviews:{
        type:Array,                 //Array of all object _id of Reviews
        default:[]                  // of that DeliveryBoy
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

module.exports = mongoose.model('deliveryBoy', deliveryBoy );