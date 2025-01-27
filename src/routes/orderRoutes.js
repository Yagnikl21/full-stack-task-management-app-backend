const express = require('express');
const { placeOrder, getOrderHistory } = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Place a new order
router.post('/place', authMiddleware, placeOrder);

// Get order history for the logged-in user
router.get('/history', authMiddleware, getOrderHistory);

module.exports = router;