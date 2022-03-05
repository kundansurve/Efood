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
        hotelId:{
            type:String,
            default:null
        },
        items:{
            type:Object,
            default:{}
        },
        address:{
            address:{
                type:String,
                default:null
            },
            deliveryLocation: {
                type: {
                    type: String,
                    enum: ['Point'],
                    //default:null
                },
                coordinates: {
                    type: [Number],
                    //default:null
                },
            },
        },
        offer:{
            type:String,
            default:null
        },
        price:{
            type:Number,
            default:0
        },
        orderingFor:{
            name:{
                type:String,
                //required:true
            },
            phoneNumber:{
                type:String,
                //required:true
            }
        }
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