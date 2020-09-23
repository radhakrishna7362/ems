const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let employee = new Schema({
    id: {
        type: String,
        required: true
    },
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    edu:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    email: {
        type:String ,
        required: true
    },
    exper: {
        type:String ,
        required: true
    },
    ss: {
        type:String ,
        required: true
    },
    date: {
        type: Date,
        default: Date.now(),
    }
});

employee = mongoose.model("ems", employee);

module.exports = employee;