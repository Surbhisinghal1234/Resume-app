import mongoose from "mongoose";
import express from "express";

import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }));
const dbName = "resumeAppTest";
const username = process.env.MONGO_USERNAME;
const password = encodeURIComponent(process.env.MONGO_PASSWORD);

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      `mongodb+srv://${username}:${password}@cluster0.3j0ywmp.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=Cluster0`
    );

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};