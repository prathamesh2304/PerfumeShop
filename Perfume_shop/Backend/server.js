const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB(process.env.MONGO_URI);

// Routes
app.use('/api/products', require('./routes/products'));

app.get('/', (req, res) => {
  res.send('Perfume Shop Backend Running');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
