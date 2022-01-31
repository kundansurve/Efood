const mongoose = require("mongoose");
const { Schema } = mongoose;

const deliveryBoy = new Schema({
    email: {
        type: String,               //email of that Hotel
        required: true,
        unique: true
    },
    isFree:{
        type:Boolean,
        default:true
    },                //busy or not
    name:{
        type: String,               //email of that Hotel
        required: true,
    },
    cityId:{
        type:String,
        required: true,
    },
    location: {
        type: {
          type: String, // Don't do `{ location: { type: String } }`
          enum: ['Point'], // 'location.type' must be 'Point'
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
        }
    },
    phoneNumber:{
        type:String,
        required:true
    },
    orders:{
        type:Array,                 //Array of all object _id of Orders
        default:[]                  //that are delivered by that deliveryBoy
    },
    currentOrder:{
        type:String,
        dafault:""
    },
    reviews:{
        type:Array,                 //Array of all object _id of Reviews
        default:[]                  // of that DeliveryBoy
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

module.exports = mongoose.model('deliveryBoy', deliveryBoy );