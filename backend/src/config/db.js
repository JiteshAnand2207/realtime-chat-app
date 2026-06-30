import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("MONGO_URI loaded:", process.env.MONGO_URI ? "YES" : "NO");

    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB Connection Error:");
    console.error(error.name);
    console.error(error.message);
    process.exit(1);
  }
};

export default connectDB;