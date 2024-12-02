const mongoose = require('mongoose');

const CartSchema  = mongoose.Schema({

    ProductId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "products"},
    UserId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "users"},

});

const CartModel = mongoose.model('cart', CartSchema);
module.exports = CartModel;