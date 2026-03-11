import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const instance = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`MongoDB connected! Host: ${instance.connection.host}`);
  } catch (error) {
    console.error("MONGODB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
