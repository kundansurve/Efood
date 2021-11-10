const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstName: String,
    lastName: String,
    City:{
        type:String
    },
    Address: String,
    addressCoordinates: String,
    phoneNumber: String,
    Orders:{
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