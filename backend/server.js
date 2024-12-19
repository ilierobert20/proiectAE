const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// Configurare server
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

require("dotenv").config({ path: "./.env" });

const fs = require("fs");
console.log("Current Directory Files:", fs.readdirSync(__dirname));
console.log("MongoDB URI:", process.env.MONGO_URI);


// Import route handlers
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/products");
const cartRoutes = require("./routes/cart");
const checkoutRoutes = require("./routes/checkout");

// consolelog mongo
console.log("MongoDB URI:", process.env.MONGO_URI);

// Checkout
app.use("/checkout", checkoutRoutes);

// Conexiune MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Rute
app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
    res.send("Backend is running!");
  });
