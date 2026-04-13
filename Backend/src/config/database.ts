import mongoose from "mongoose";
import config from "./config.js";

export async function connectDb() {
  try {
    await mongoose.connect(config.MONGO_URI);
    console.log("MongoDB Connected !");
  } catch (error) {
    console.log("Error while connecting to database !");
    process.exit(1);
  }
}
