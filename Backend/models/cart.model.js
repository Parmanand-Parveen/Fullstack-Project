// models/Cart.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [{
    product: { type: Schema.Types.ObjectId,
    ref: 'Product', required: true },
    quantity:{ type: Number, required: true,default: 1 },
  }],
}, {
  timestamps: true,
});

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;