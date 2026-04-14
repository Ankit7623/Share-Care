import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';

// Routes
import authRoutes from './routes/auth.js';

dotenv.config();

const app = express();
const server = http.createServer(app);

// Socket.io for Real-time features
export const io = new Server(server, {
  cors: {
    origin: '*', // For dev
    methods: ['GET', 'POST']
  }
});

app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/sharecare')
  .then(() => console.log('✅ MongoDB Connected Logically'))
  .catch(err => {
      console.error('❌ MongoDB Connection Error:', err);
      // We log but don't exit to allow the server to start even if Mongo isn't running locally for the demo.
      // In production, you'd want to handle this differently.
  });

// API Routes
app.use('/api/auth', authRoutes);

// Basic health check route
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'ShareCare API is running!' });
});

// Socket.IO Logic
io.on('connection', (socket) => {
    console.log(`📡 New client connected: ${socket.id}`);

    socket.on('disconnect', () => {
        console.log(`🔌 Client disconnected: ${socket.id}`);
    });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 ShareCare Backend running on http://localhost:${PORT}`);
});
