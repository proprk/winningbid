import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  sku: { type: String },
  description: { type: String },
  spec: { type: mongoose.Schema.Types.Mixed },
  bidPrice: { type: Number, required: true },
  currency: { type: String, default: 'USD' },
  year: { type: Number },
  date: { type: Date },
  won: { type: Boolean, default: false },
  competitor: {
    name: String,
    location: String,
    markup: String
  },
  sourceFile: String,
  notes: String,
  createdAt: { type: Date, default: Date.now }
});

// Text index for search
ProductSchema.index({ productName: 'text', description: 'text' });
ProductSchema.index({ 'competitor.name': 1, year: 1, bidPrice: 1 });

export default mongoose.models.Product || mongoose.model("Product", ProductSchema, "bids");