const express = require("express");
const cors = require("cors");
const Stripe = require("stripe");

// Inițializează Stripe cu SECRET_KEY
const stripe = Stripe("sk_test_v0rQRqenSs7uso5uewLvjI7b00A9HmbCmN");

const router = express.Router();

// Middleware
router.use(cors());
router.use(express.json());

router.post("/create-checkout-session", async (req, res) => {
  console.log("Req Body:", req.body); // Verifică dacă req.body conține items
  const { items } = req.body;

  try {
    const lineItems = items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100, // Stripe folosește centi
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/cancel",
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Error creating Stripe session:", error);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
});

module.exports = router;
