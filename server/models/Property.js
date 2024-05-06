import mongoose from "mongoose";
export const PROPERTY_TYPES = [
  "Книги",
  "Курсы"
];

const schema = new mongoose.Schema({
  title: { type: [String], required: true },
  images: { type: [String], required: true },
  area: { type: Number, required: true },
  onMainPage: { type: Boolean, default: false },
  address: { type: [String], required: true },
  book: { type: Number, required: true, default: 300000 },
  filePrice: { type: Number, default: 7000 },
  file: { type: String, required: false },
  video: { type: String, required: false },
  directions: {
    type: String,
    enum: PROPERTY_TYPES,
    required: true,
  },
  price: { type: Number, required: true }, //цена
  rating: { type: Number, required: false },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Developer",
    required: true,
  },
  info: {
    roi: { type: [String], required: false },
    liquidity: { type: [String], required: false },
    priceOverTime: { type: [String], required: false },
    repairCost: { type: [String], required: false },
    sale: { type: [String], required: false },
    rentalRate: { type: [String], required: false },
    price: { type: [String], required: false },
  },
  description: { type: [String], required: true },
  dealOverview: { type: [String], required: true },
  dealProfitability: { type: [String], required: true },
  dealCapitalIncrease: { type: [String], required: true },
  isCompleted: { type: Boolean, default: true }
});

export default mongoose.model("Property", schema);
