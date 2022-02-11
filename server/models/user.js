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
    location: {
        type: {
          type: String,
          enum: ['Point'],
        },
        coordinates: {
          type: [Number],
        }
    },
    phoneNumber: {
        type:String,
        required:true
    },
    orders:{
        type: Array,
        default:[]
    },
    pastSearches:{
        type:Array,
        default:[]
    },
    cart:{
        type:Object,
        default:{"hotelId":null,"items":{}}
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

module.exports = mongoose.model('user', userSchema);