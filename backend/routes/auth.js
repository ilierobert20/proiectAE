const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// Middleware pentru verificarea token-ului
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access denied" });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token" });
  }
};

// Test GET /auth
router.get("/", (req, res) => {
  res.send("Auth route is working!");
});


// Register User
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verifică dacă utilizatorul există
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email-ul este deja înregistrat!" });
    }
    

    // Hashare parolă
    const hashedPassword = await bcrypt.hash(password, 10);

    // Creare user nou
    const newUser = new User({
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "Utilizator înregistrat cu succes!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Eroare la înregistrare!" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verificăm dacă utilizatorul există
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Utilizator negasit!" });
    }

    // Comparăm parola introdusă cu parola hash-uită
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Email/parola gresita!" });
    }

    // Generăm token JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Te-ai logat cu succes!", token });
  } catch (err) {
    console.error("Error during login:", err.message);
    res.status(500).json({ message: "Nu ai reusit sa te loghezi!", error: err.message });
  }
});

// Ruta GET /auth/profile
router.get("/profile", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch user profile" });
  }
});

module.exports = router;
