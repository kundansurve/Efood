const mongoose = require("mongoose");
const { Schema } = mongoose;

const reviewSchema = new Schema({
    reviewedByName:{
        type:String,
        rquired:true
    },
    reviewType:{
        type:String,
        rquired:true
    },
    reviewForId:{
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