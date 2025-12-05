/* routes/products.js */
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().select('name price images description slug');
    res.json(products);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// GET single product by id
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if(!product) return res.status(404).json({message:'Product not found'});
    res.json(product);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// POST review for product
router.post('/:id/reviews', async (req, res) => {
  const { name, rating, comment } = req.body;
  if(!name || !rating || !comment) return res.status(400).json({ message: 'Missing fields' });
  try {
    const product = await Product.findById(req.params.id);
    if(!product) return res.status(404).json({ message: 'Product not found' });
    product.reviews.push({ name, rating, comment });
    await product.save();
    res.status(201).json({ message: 'Review added', reviews: product.reviews });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
