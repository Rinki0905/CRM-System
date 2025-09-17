import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// Config
import connectDB from './config/db';

// Routes
import authRoutes from './routes/authRoutes';
import customerRoutes from './routes/customerRoutes';
import dealRoutes from './routes/dealRoutes';
import taskRoutes from './routes/taskRoutes';
import chatbotRoutes from './routes/chatbotRoutes';
import dashboardRoutes from './routes/dashboardRoutes';
import analyticsRoutes from './routes/analyticsRoutes';

// Initialize
dotenv.config();
connectDB();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes Setup
app.use('/api/auth', authRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/deals', dealRoutes);
app.use('/api/tasks', taskRoutes); // This line activates all your task routes
app.use('/api/chatbot', chatbotRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/analytics', analyticsRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));