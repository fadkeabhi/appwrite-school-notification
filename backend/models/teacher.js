const mongoose = require('mongoose')

const teacher = mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    fName:{
        type:String,
        required:true
    },
    lName:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    class:[String]
})

const TEACHER = new mongoose.model('teacher',teacher)

module.exports = TEACHER