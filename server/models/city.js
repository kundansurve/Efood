const mongoose = require("mongoose");
const { Schema } = mongoose;

const city = new Schema({
    adminName:{
        type: String,
        required: true,
    },
    cityName:{
        type:String,
        required:true
    },
    adminPhoneNumber:{
        type: String,               //email of that Hotel
        required: true,
        unique: true
    },
    email: {
        type: String,               //email of that Hotel
        required: true,
        unique: true
    },
    location: {
        type: {
          type: String, // Don't do `{ location: { type: String } }`
          enum: ['Polygon'], // 'location.type' must be 'Point'
          //required: true
        },
        coordinates: {
          type: [Number],
          //required: true
        }
    },
    hotels:{
        type:Array,
        default:[],
    },
    deliveryBoys:{
        type:Array,
        default:[],
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
module.exports = mongoose.model('city', city );