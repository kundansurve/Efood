const mongoose = require("mongoose");
const { Schema } = mongoose;

const hotelSchema = new Schema({
    email: {
        type: String,               //email of that Hotel
        required: true,
        unique: true
    },
    name:{
        type: String,               //email of that Hotel
        required: true,
        unique: true
    },
    centerId:{
        type:string,
        required: true,
    },
    city:{
        type:String,                // City of that Hotel
        required:true
    },
    address: {
        type:String,                // Address of that Hotel
        required:true
    },
    addressCoordinates:{
        type:Array,                 //Array of Longitudes and Latitudes 
        required: true              //of that Hotel on map
    },
    dish:{
        type:Array,                 //Array of all object _id of dish 
        default:[]                  //that are offered by that hotel
    },
    orders:{
        type:Array,                 //Array of all object _id of Orders
        default:[]                  //that are placed in that hotel
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

module.exports = mongoose.model('hotel',  hotelSchema);