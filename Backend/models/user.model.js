// models/User.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
   
  },
  email: {
    type: String,
    
  },
  password: {
    type: String,

  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },

  cart: [{
    type: Schema.Types.ObjectId,
    ref: 'Cart',
  }],
  order: [{
    type: Schema.Types.ObjectId,
    ref: 'Order',
  }],
},{
  timestamps: true});

// Hash the password before saving
// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next();
//   this.password = bcrypt.hash(this.password, 10);
//   next();
// });

// Method to compare password
userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);

