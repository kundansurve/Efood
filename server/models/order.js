const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
    paymentId:{
        type:String,
        required:true
    },
    placedByUserId: {
        type: String,
        required: true
    },
    placedInHotelId: {
        type: String,
        required: true
    },
    assignedToDeliveryBoyId: {
        type: String,
        default:null
    },
    userInfo:{
        type:Object,
        required:true,
        default:null
    },
    cityId:{
        type: String,
        required: true
    },
    hotelAccepted:{
        type:Boolean,
        default:null
    },deliveryLocation:{
        address:{
            type:String,
            default:null
        },
        detailAddress:{
            type:String,
            default:null
        },
        lngLat: {
            type: {
                type: String,
                enum: ['Point'],
                //default:null
            },
            coordinates: {
                type: [Number],
                default:null
            },
        },
    },
    orderPickup:{
        type: {
            type: String,
            enum: ['Point']
          },
          coordinates: {
            type: [Number],
            required: true
          }
    },
    order:{
        type:Object,
        required:true
    },
    isPaid:{
        type:Boolean,
        required: true
    },
    deliveryCharges:{
        type:Number,
        required:true
    },
    totalPrice:{
        type:Number,
        required: true
    },
    status:{
        type: String,
        default: "Food is Being Processed"
    },
    placedAt: {
        type: Date,
        default: Date.now()
    },
    deliveryBoyRecievedOrderAt: {
        type: Date,
        default:null
    },
    deliveredAt: {
        type: Date,
        defualt:null
    }

});

module.exports = mongoose.model('order', orderSchema );