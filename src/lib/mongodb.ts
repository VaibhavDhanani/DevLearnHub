import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) return;
  const MONGODB_URI = process.env.MONGODB_URI;
  try {
    await mongoose.connect(MONGODB_URI as string, {
        dbName:"devlearn",
    });
    isConnected = true;
    console.log("MongoDB connected ! ");
  } catch (err) {
    console.error("MongoDB connection error! :" + err);
  }
};
