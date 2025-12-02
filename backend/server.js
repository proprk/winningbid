import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('MONGODB_URI missing in .env');
  process.exit(1);
}

mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });

// Define a simple root route so `GET /` works
app.get('/', (req, res) => {
  res.send('WinningBid backend is up ✅');
});

// Import products router and mount it
import productsRouter from './routes/products.js';
app.use('/api/products', productsRouter);

// Start server on PORT from env or fallback 5050
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});