const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const addressSchema = new Schema({
  userId: {
    type: String,
  },
  name: { type: String },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  country: {
    type: String,
  },
  pincode: {
    type: String,
  },
  phone: {
    type: String,
  },
});

module.exports = mongoose.model("Address", addressSchema);
