const mongoose = require('mongoose')

const studSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    parentEmail:{
        type:String,
        required:true,
        unique:true
    },
    fName:{
        type:String,
        required:true
    },
    pName:{
        type:String,
        required:true
    },
    lName:{
        type:String,
        required:true
    },
    sPhone:{
        type:Number,
        required:true
    },
    pPhone:{
        type:Number,
        required:true
    },
    class:{
        type:String
    }
    
})

const STUD = mongoose.model('stud', studSchema)
module.exports = STUD