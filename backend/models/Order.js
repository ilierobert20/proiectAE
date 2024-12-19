const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  products: [{ productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" }, quantity: Number }],
  total: Number,
});

module.exports = mongoose.model("Order", OrderSchema);