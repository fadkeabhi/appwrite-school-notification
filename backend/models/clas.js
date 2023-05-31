const mongoose = require('mongoose')

const clas = new mongoose.Schema({
    class:{
        type:String,
        required:true,
        unique:true
    }
    
})

const CLAS = new mongoose.model('clas', clas)
module.exports = CLAS