const express = require('express');
const { addMenu, getMenu, editMenuItem } = require('../controllers/menuController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Add a new menu item (Protected)
router.post('/', authMiddleware, addMenu);

// Get all menu items with pagination (Open to all)
router.get('/', authMiddleware, getMenu);

router.patch("/:id", authMiddleware, editMenuItem);

module.exports = router;
