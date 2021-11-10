const mongoose = require("mongoose");
const { Schema } = mongoose;

const reviewSchema = new Schema({
    reviewType:{
        type:String,
        rquired:true
    },
    reviewedForName:{
        type:String,
        required:true
    },
    reviewForId:{
        type:String,
        required:true
    },
    reviewedByName:{
        type:String,
        required:true
    },
    reviewedById:{
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