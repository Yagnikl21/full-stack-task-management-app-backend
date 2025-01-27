const Menu = require('../models/Menu');
const { getPaginationMetadata, getPaginatedResponse } = require('../utils/pagination');

// Add a new menu item
exports.addMenu = async (req, res, next) => {
  try {
    const { name, category, price, availability } = req.body;

    // Validate required fields
    if (!name || !category || !price) {
      return res.status(400).json({ error: 'Name, category, and price are required.' });
    }

    const menu = await Menu.create({ name, category, price, availability });
    res.status(201).json({ message: 'Menu item added successfully', menu });
  } catch (err) {
    next(err);
  }
};

// Get menu items with pagination
exports.getMenu = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const { skip, limit: limitPerPage } = getPaginationMetadata(page, limit);

    // Fetch data with pagination
    const totalCount = await Menu.countDocuments({});
    const menuItems = await Menu.find({})
      .skip(skip)
      .limit(limitPerPage);

    // Return paginated response
    const response = getPaginatedResponse(menuItems, totalCount, parseInt(page), parseInt(limit));
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

exports.editMenuItem = async (req, res) => {
  const { id } = req.params; // Menu item ID
  const { name, category, price, availability } = req.body;

  try {
    const updatedItem = await Menu.findByIdAndUpdate(
      id,
      { name, category, price, availability },
      { new: true, runValidators: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ error: "Menu item not found." });
    }

    res.status(200).json({ message: "Menu item updated successfully", updatedItem });
  } catch (err) {
    console.error("Error updating menu item:", err);
    res.status(500).json({ error: "Failed to update menu item. Please try again." });
  }
};