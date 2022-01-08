const mongoose = require("mongoose");
const { Schema } = mongoose;

const waiting = new Schema({
    centerId:{
        type:string,
        required: true,
    },
    waitingList:{
        type:Array,
        default:[]
    }
});

module.exports = mongoose.model('waiting', waiting );