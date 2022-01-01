const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
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
        required: true
    },
    diliverToAdress:{
        type: Object,
        required:true
    },
    dishes: {
        type:Array,
        required:true
    },
    quantity: {
        type:Array,
        required:true
    },
    isPaid:{
        type:boolean,
        required: true
    },
    totalPrice:{
        type:Number,
        required: true
    },
    status:{
        type: String,
        default: "Order is Being Processed"
    },
    placedAt: {
        type: Date,
        default: Date.now()
    },
    deliveryBoyReachedHotelAt: {
        type: Date,
        default:null
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