const mongoose = require("mongoose");
const { Schema } = mongoose;

const hotelSchema = new Schema({
    email: {
        type: String,               //email of that Hotel
        required: true,
        unique: true
    },
    img:{
        type:String
    },
    name:{
        type: String,               //email of that Hotel
        required: true,
        unique: true
    },
    phoneNumber:{
        type:String,
        required:true,
        unique:true
    },
    cityId:{
        type:String,
        required: true,
    },
    location: {
        type: {
          type: String,
          enum: ['Point'],
          
        },
        coordinates: {
          type: [Number],
          required: true
        }
    },
    ratings:{
        type:Number,
        default:0
    },      
    numberofRatings:{
        type:Number,
        default:0
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