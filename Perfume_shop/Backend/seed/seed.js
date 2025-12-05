/* seed/seed.js */
const mongoose = require('mongoose');
require('dotenv').config();
const connectDB = require('../config/db');
const Product = require('../models/Product');

const products = [
  {
    name: 'Aqua Essence',
    slug: 'aqua-essence',
    description: 'Fresh aquatic fragrance with citrus top notes.',
    price: 1299,
    sizes: ['50ml', '100ml'],
    images: [
      'https://picsum.photos/seed/m1/800/800',
      'https://picsum.photos/seed/m2/800/800'
    ],
    reviews: [{ name: 'Asha', rating: 5, comment: 'Lovely scent' }]
  },
  {
    name: 'Midnight Oud',
    slug: 'midnight-oud',
    description: 'Warm oud fragrance with spicy undertones.',
    price: 1999,
    sizes: ['50ml', '100ml'],
    images: ['https://picsum.photos/seed/o1/800/800'],
    reviews: []
  },
  {
    name: 'Rose Bloom',
    slug: 'rose-bloom',
    description: 'A romantic blend of rose, jasmine, and vanilla.',
    price: 1599,
    sizes: ['30ml', '100ml'],
    images: ['https://picsum.photos/seed/r1/800/800'],
    reviews: []
  },
  {
    name: 'Citrus Rush',
    slug: 'citrus-rush',
    description: 'Energetic citrus fragrance perfect for daily wear.',
    price: 999,
    sizes: ['30ml', '50ml'],
    images: ['https://picsum.photos/seed/c1/800/800'],
    reviews: []
  }
];

(async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log('Database seeded successfully');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
})();
