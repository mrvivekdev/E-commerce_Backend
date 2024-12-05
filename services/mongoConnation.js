const mongoose = require('mongoose');

function MongooseConnation(DBurl){
    return mongoose.connect(DBurl).catch((error)=>{
        console.log('MongoDB Database Connation error:', error);
    });
};

module.exports = MongooseConnation;