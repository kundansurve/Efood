const mongoose = require("mongoose");
const { Schema } = mongoose;

const waiting = new Schema({
    list:{
        type:Array,
        default:[]
    }
});

module.exports = mongoose.model('waiting', waiting );