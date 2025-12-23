const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  productCode: {
    type: String,
    required: true,
    unique: true,
    index: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  sourceEmail: {
    type: String,
    required: true,
    lowercase: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);