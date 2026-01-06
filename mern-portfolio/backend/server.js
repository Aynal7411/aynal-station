
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';

import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import projectRoutes from './routes/projects.js';
import contactRoutes from './routes/contact.js';
import skillRoutes from './routes/skills.js';
import errorHandler from './middleware/errorHandler.js';



const app = express();

// Connect to MongoDB
connectDB();
console.log("MONGO_URI:", process.env.MONGO_URI);

// Middleware
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://aynal-station.netlify.app"
  ],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/skills', skillRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});