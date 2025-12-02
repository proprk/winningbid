import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

// GET /api/products?search=&competitor=&year=&page=&limit=&sort=
router.get('/', async (req, res) => {
  try {
    const { search, competitor, year, page = 1, limit = 25, sort } = req.query;
    const q = {};
    
    if (competitor && competitor !== 'All') {
      q.competitor = { $regex: `^${competitor}$`, $options: 'i' };
    }

    if (year) q.year = Number(year);

    // if search provided, use text search
    if (search) {
      q.$text = { $search: search };
    }

    let mongoQuery = Product.find(q);

    // sorting options
    if (sort === 'price_asc') mongoQuery = mongoQuery.sort({ bidPrice: 1 });
    else if (sort === 'price_desc') mongoQuery = mongoQuery.sort({ bidPrice: -1 });
    else mongoQuery = mongoQuery.sort({ createdAt: -1 });

    const skip = (Number(page) - 1) * Number(limit);
    const total = await Product.countDocuments(q);
    const results = await mongoQuery.skip(skip).limit(Number(limit)).lean();

    res.json({ total, page: Number(page), limit: Number(limit), results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// POST /api/products  (quick way to add a row)
router.post('/', async (req, res) => {
  try {
    const p = new Product(req.body);
    await p.save();
    res.status(201).json(p);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Bad request', error: err.message });
  }
});

export default router;
