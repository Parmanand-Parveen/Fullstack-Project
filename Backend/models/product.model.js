// models/Product.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  saleprice:{
    type:Number,
    default:0
  },
  category: {
    type: String,
    required: true,
  },
  brand:{
    type:String
  },
  quantity: {
    type: Number,
  },
  image: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

module.exports= mongoose.model('Product', productSchema);

