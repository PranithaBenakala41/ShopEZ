const express = require("express");
const router = express.Router();

const Order = require("../models/Order");
const Product = require("../models/Product");
const User = require("../models/User");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// =========================
// CREATE ORDER (USER)
// =========================
router.post("/", authMiddleware, async (req, res) => {
  try {
    const {
      customerName,
      phone,
      street,
      city,
      pincode,
      items,
      totalAmount,
      paymentMethod,
    } = req.body;

    const order = new Order({
      userId: req.user.id,
      customerName,
      phone,
      street,
      city,
      pincode,
      items,
      totalAmount,
      paymentMethod: paymentMethod || "COD",
      paymentStatus: "Pending",
      status: "Pending",
    });

    const saved = await order.save();
    res.json(saved);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to place order" });
  }
});

// =========================
// USER ORDERS
// =========================
router.get("/", authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});


// =========================
// CANCEL ORDER
// =========================
router.put("/cancel/:id", authMiddleware, async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.status !== "Pending") {
      return res.status(400).json({ message: "Cannot cancel" });
    }

    order.status = "Cancelled";
    await order.save();

    res.json({ message: "Cancelled successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error cancelling order" });
  }
});


// =========================
// ADMIN - ALL ORDERS
// =========================
router.get(
  "/admin/stats",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const totalProducts = await Product.countDocuments();
      const totalOrders = await Order.countDocuments();
      const totalUsers = await User.countDocuments();

      const deliveredOrders = await Order.countDocuments({
        status: "Delivered",
      });

      const pendingOrders = await Order.countDocuments({
        status: "Pending",
      });

      const revenueData = await Order.aggregate([
        {
          $match: { status: "Delivered" },
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$totalAmount" },
          },
        },
      ]);

      res.json({
        totalProducts,
        totalOrders,
        totalUsers,
        deliveredOrders,
        pendingOrders,
        revenue: revenueData[0]?.total || 0,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Server Error" });
    }
  }
);
module.exports = router;