const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const mongoose = require('mongoose');
const { authenticateToken } = require('./Middleware/authMiddleware');

mongoose.set('strictQuery', true);

const app = express();

// Connect to MongoDB
connectDB();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('<h1>Connected to Web Server</h1>');
});

// Define other routes
app.use('/api/auth', authRoutes);
app.use('/api/user',authenticateToken, userRoutes);

app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    message: error.message,
  });
});

module.exports = app;
