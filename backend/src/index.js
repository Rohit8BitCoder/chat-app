import express from 'express';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";

import authRoutes from './routers/auth.router.js';
import messageRoutes from './routers/message.router.js'; // Fixed naming
import { connectDB } from './lib/db.js';

dotenv.config();

const app = express();

const port = process.env.PORT || 5000; // Use 5000 if PORT is undefined

// Middleware
app.use(express.json()); // Enable JSON parsing
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes); // Fixed naming

// Connect to DB and start server
const startServer = async () => {
  try {
    await connectDB(); // Ensure connectDB returns a Promise
    app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });
  } catch (err) {
    console.error("Database connection failed:", err);
    process.exit(1); // Exit the process if DB connection fails
  }
};

startServer();