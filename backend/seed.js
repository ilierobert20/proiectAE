const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected for seeding"))
.catch((err) => console.error("MongoDB connection error:", err));

const seedProducts = async () => {
  const products = [
    { name: "Laptop Dell Inspiron", description: "Laptop performant cu procesor i7 și 16GB RAM", price: 3200 },
    { name: "Smartphone Samsung Galaxy", description: "Telefon inteligent cu ecran AMOLED", price: 2400 },
    { name: "Căști Wireless Sony", description: "Căști wireless cu anulare a zgomotului", price: 600 },
  ];

  try {
    await Product.deleteMany(); // Șterge produsele existente
    await Product.insertMany(products);
    console.log("Produse adăugate cu succes!");
    mongoose.connection.close();
  } catch (err) {
    console.error("Eroare la popularea bazei de date:", err);
  }
};

seedProducts();
