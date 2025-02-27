import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("DB ", process.env.MONGO_URI)
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (e) {
    console.log(e);
  }
};

export default connectDB;
