const mongoose = require("mongoose");
const { Schema } = mongoose;

const reviewSchema = new Schema({
    reviewedByName:{
        type:String,
        rquired:true
    },
    reviewedById:{
        type:String,
        required:true
    },
    orderId:{
        type:String,
        required:true
    },
    hotel:{
        hotelId:{
            type:String,
            required:true
        },
        dishId:{
            type:Array,
            required:true
        },review: {
            type:String,
            required:true
        },
        rating: {
            type:Number,
            required:true
        },
    },
    cityId:{
        type:String,
        required:true
    },
    deliveryExecutive:{
        deliveryExecutiveId:{
            type:String,
            required:true
        },
        review: {
            type:String,
            required:true
        },
        rating: {
            type:Number,
            required:true
        },
    },
    reviewedAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('review', reviewSchema );