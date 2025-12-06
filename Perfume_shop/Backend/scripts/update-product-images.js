/*
  scripts/update-product-images.js
  Updates product documents (by slug) to point to frontend static images.
  Make sure Frontend dev server (http://localhost:5173) will serve /images/<filename>
  Ensure Backend/.env has MONGO_URI set.
*/
const mongoose = require('mongoose');
require('dotenv').config({ path: __dirname + '/../.env' });
const connectDB = require('../config/db');
const Product = require('../models/Product');

const mapping = {
  'aqua-essence': 'aqua-essence.jpg',
  'midnight-oud': 'midnight-oud.jpg',
  'rose-bloom': 'rose-bloom.jpg',
  'citrus-rush': 'citrus-rush.jpg'
};

(async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI not found in Backend/.env — set it before running this script.');
    }
    await connectDB(process.env.MONGO_URI);
    console.log('Connected to MongoDB.');

    for (const [slug, filename] of Object.entries(mapping)) {
      const url = `http://localhost:5173/images/${filename}`;
      const updated = await Product.findOneAndUpdate(
        { slug },
        { $set: { images: [url] } },
        { new: true, runValidators: true }
      );
      if (updated) {
        console.log(`Updated product "${slug}" -> ${url}`);
      } else {
        console.log(`Product with slug "${slug}" not found — skipping.`);
      }
    }

    console.log('Done updating products.');
    process.exit(0);
  } catch (err) {
    console.error('Error:', err.message || err);
    process.exit(1);
  }
})();
