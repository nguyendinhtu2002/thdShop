const mongoose = require('mongoose');

// Tạo schema cho Product
const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  discountPercentage: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    default: 0
  },
  stock: {
    type: Number,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String,
    required: true
  },
  images: {
    type: [String],
    required: true
  }
});

// Tạo model cho Product
const Product = mongoose.model('Product', productSchema);

module.exports = Product;