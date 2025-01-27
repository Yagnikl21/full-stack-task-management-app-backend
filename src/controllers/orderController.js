const Order = require("../models/Order");
const jwt = require("jsonwebtoken");

const extractUserIdFromToken = (token) => {
   try {
      // Verify and decode the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      return decoded.id; // Access the `id` field from the token payload
   } catch (err) {
      console.error("Error verifying token:", err.message);
      return null; // Handle invalid or expired tokens
   }
};

// Place a new order
exports.placeOrder = async (req, res) => {
   try {
      const { items, totalAmount } = req.body;
      if (!items || items.length === 0 || !totalAmount) {
         return res
            .status(400)
            .json({ error: "Items and total amount are required." });
      }
      
      const token = req.headers.authorization.split(" ")[1];
      const userId = extractUserIdFromToken(token);
      const order = await Order.create({
         userId: userId, // Extracted from verified token
         items,
         totalAmount,
         status: "Pending", // Default status
      });

      res.status(201).json({ message: "Order placed successfully", order });
   } catch (err) {
      console.error("Error placing order:", err);
      res.status(500).json({
         error: "Failed to place order. Please try again.",
      });
   }
};

exports.getOrderHistory = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const userId = extractUserIdFromToken(token);

  try {
    // Populate the `items.menuItemId` field to get full item details
    const orders = await Order.find({ userId: userId }).populate({
      path: "items.menuItemId",
      model: "Menu", // Reference to the Menu model
    });

    if (!orders || orders.length === 0) {
      return res
        .status(404)
        .json({ message: "No orders found for this user." });
    }

    res.status(200).json({ orders });
  } catch (err) {
    console.error("Error fetching order history:", err);
    res.status(500).json({
      error: "Failed to fetch order history. Please try again.",
    });
  }
};