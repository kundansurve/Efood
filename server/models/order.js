const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
    placedByUser: {
        type: String,
        required: true
    },
    placedInHotel: {
        type: String,
        required: true
    },
    assignedToDeliveryBoy: {
        type: String,
        required: true
    },
    diliverToAdress:{
        type: Object,
        required:true
    },
    dishes: Array,
    quantity: Array,
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