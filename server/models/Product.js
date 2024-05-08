import mongoose from "mongoose";
export const PRODUCT_TYPES = [
  "Books",
  "Courses"
];

const schema = new mongoose.Schema({
  title: { type: [String], required: true },
  images: { type: [String], required: true },
  onMainPage: { type: Boolean, default: false },
  type: {
    type: String,
    enum: PRODUCT_TYPES,
    required: true,
  },
  price: { type: Number, required: true },
  rating: { type: Number, required: false },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
    required: true,
  },
  lessons: {
    type: [{
      title: { type: String, required: false },
      video_url: { type: String, required: false },
      text: { type: String, required: false },
      order: { type: Number, required: false }
    }], required: false
  },
  description: { type: [String], required: true },
  book_url: { type: String, required: false },
});

export default mongoose.model("Product", schema);
