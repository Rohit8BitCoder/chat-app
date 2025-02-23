import express from 'express';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser"

import authRoutes from './routers/auth.router.js';
import messageRouters from './routers/message.router.js'
import { connectDB } from './lib/db.js';

dotenv.config();

const app = express();

const port = process.env.PORT || 5000; // Use default if PORT is undefined

// Middleware
app.use(express.json());// Enable JSON parsing
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use('/api/message',messageRouters);

// Connect to DB before starting server
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });


