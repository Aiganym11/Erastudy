import mongoose from "mongoose";

const schema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  skills: { type: [String], required: true },
  experience: { type: Number, required: true },
  hourlyRate: { type: Number, required: true },
});

export default mongoose.model("Author", schema);
