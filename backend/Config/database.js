const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

let db = null;
const ConnectionDB = async () => {
    try{
        db = mongoose.connect(process.env.MONGODB_URL);
        console.log("DB Connected Successfully....");
    }
    catch(error){
        console.log("Database Connecting Error", error);
    }
}

module.exports = ConnectionDB;