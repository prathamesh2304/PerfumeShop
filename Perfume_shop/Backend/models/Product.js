/* models/Product.js */
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  name: String,
  rating: { type: Number, min: 1, max: 5 },
  comment: String,
  createdAt: { type: Date, default: Date.now }
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: String,
  price: Number,
  sizes: [String],
  images: [String],
  reviews: [reviewSchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);
