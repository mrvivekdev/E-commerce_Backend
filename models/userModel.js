const mongoose = require('mongoose');

const UserSchema  = mongoose.Schema({

    Fullname: {type: String, required: true},
    Email: {type: String, required: true, unique: true},
    Password: {type: String, required: true},
    Phonenumber: {type: Number, required: true},
    Address: {type: String},
    Street: {type: String},
    HomeNumber: {type: String},  
    City: {type: String},
    Landmark: {type: String},    
    Pincode: {type: Number}
});

const UserModel = mongoose.model('user', UserSchema);
module.exports = UserModel;