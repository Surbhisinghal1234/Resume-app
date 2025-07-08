import { connectDB } from './config/db.js';
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from './routes/authRoutes.js';
// import userRoutes from "./routes/userRoutes.js";
import passwordRoutes from "./routes/passwordRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";

const app = express();
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));

app.use('/api', authRoutes);
// app.use("/api/user", userRoutes);
app.use("/api/auth", passwordRoutes);
app.use("/api/resume", resumeRoutes);


const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB(); 
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Error starting server:", err.message);
  }
};

startServer();