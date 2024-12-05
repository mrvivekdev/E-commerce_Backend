const mongoose = require('mongoose');

const ProductSchema  = mongoose.Schema({

    ProductBy: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "users"},
    ProductName: {type: String, required: true},
    ProductSummery: {type: String, required: true},
    Type: {type: String, required: true},
    Price: {type: Number, required: true},
    Discount: {type: Number, required: true}, 
    Images: {type: String, required: true},

});

const ProductModel = mongoose.model('product', ProductSchema);
module.exports = ProductModel;