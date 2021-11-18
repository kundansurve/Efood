const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstName:{
        type: String,
        required: true,
        unique: true
    },
    lastName: {
        type: String,
        required: true,
        unique: true
    },
    city:{
        type:String
    },
    Address: String,
    addressCoordinates: String,
    phoneNumber: String,
    orders:{
        type: Array,
        default:[]
    },
    pastSearches:{
        type:Array,
        default:[]
    },
    cart:{
        type:Array,
        default:[]
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

module.exports = mongoose.model('User', userSchema);