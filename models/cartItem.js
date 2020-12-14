const mongoose = require('mongoose');
const userCartSchema = new mongoose.Schema({
    username: String,
    trackid: String,
    trackname: String,
    quantity: String,
    unitprice: String
});
const CartItem = mongoose.model('userCart', userCartSchema);

module.exports = CartItem;