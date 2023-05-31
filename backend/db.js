require("dotenv").config();

const mongoose = require('mongoose')

async function connectToMongoose()
{
    return mongoose.connect(process.env.DATABASE_URL,{family:4})
}

module.exports = {connectToMongoose}