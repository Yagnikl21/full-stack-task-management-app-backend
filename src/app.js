const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes'); // Authentication routes
const menuRoutes = require('./routes/menuRoutes'); // Menu management routes
const orderRoutes = require('./routes/orderRoutes'); // Order management routes

const app = express();

app.use(cors({
  origin: '*', // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true, 
}));


// Middleware
app.use(express.json()); // Parses JSON requests

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/order', orderRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
  });
});

module.exports = app;
