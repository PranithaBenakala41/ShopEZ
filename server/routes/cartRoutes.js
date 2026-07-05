const express = require("express");
const router = express.Router();

const Cart = require("../models/Cart");
const authMiddleware = require("../middleware/authMiddleware");

// ADD TO CART
router.post("/add", authMiddleware, async (req, res) => {
  const { productId, name, price, quantity } = req.body;

  const item = await Cart.create({
    userId: req.user.id,
    productId,
    name,
    price,
    quantity,
  });

  res.json({ message: "Added to cart", item });
});

// (GET CART)
router.get("/", authMiddleware, async (req, res) => {
  const items = await Cart.find({ userId: req.user.id });
  res.json(items);
});

module.exports = router;
