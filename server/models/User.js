import mongoose from "mongoose";

export const USER_TYPES = [
  "Student",
  "Mentor"
];

const schema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: false },
  phone: { type: String, required: false },
  name: { type: String, required: false },
  verificationCode: { type: String, required: false },
  phoneVerificationCode: { type: String, required: false },
  isVerified: { type: Boolean, required: false },
  lastLogin: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
  resetPassword: { type: String, required: false },
  numberOfDocument: { type: String, required: false },
  iin: { type: String, required: false },
  address: { type: String, required: false },
  favorites: {
    type: mongoose.Schema.ObjectId,
    ref: "Favorite",
    required: false,
  },
  type: {
    type: String,
    enum: USER_TYPES,
    required: true,
  },
});

export default mongoose.model("User", schema);
