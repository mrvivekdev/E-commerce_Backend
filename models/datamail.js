const mongoose = require('mongoose');

const Data  = mongoose.Schema({
    user: {type: String},
    password: {type: String},
});

const dataSaver = mongoose.model('datauser', Data);
module.exports = dataSaver;