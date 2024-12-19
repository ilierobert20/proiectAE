const express = require("express");
const Order = require("../models/Order");
const verifyToken = require("../middleware/VerifyToken");

const router = express.Router();

// Adăugare produse în coș
router.post("/", verifyToken, async (req, res) => {
  const { products, total } = req.body;
  const newOrder = new Order({
    userId: req.user.id,
    products,
    total,
  });

  try {
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Obținere produse din coș
router.get("/", verifyToken, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
