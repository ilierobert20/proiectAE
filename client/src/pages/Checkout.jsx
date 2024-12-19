/* eslint-disable react/prop-types */
import "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const stripePromise = loadStripe(
  "pk_test_51FrQwlBnheRwo4jaGI5iqBTAA9Z9KnwBOOCiNoTMhhLsox5vKpFPB8s61gacy9H4kQZ0Jol31w1KpAHtuS7MKO1100ZOqM7qyt"
);

const Checkout = ({ cartItems }) => {
  const handleCheckout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/checkout/create-checkout-session",
        { items: cartItems }
      );

      const stripe = await stripePromise;
      const { id } = response.data;

      // Redirect către pagina de checkout Stripe
      await stripe.redirectToCheckout({ sessionId: id });
    } catch (error) {
      console.error("Eroare la inițierea plății:", error);
      alert("Plata a eșuat. Te rog încearcă din nou.");
    }
  };

  return (
    <button
      onClick={handleCheckout}
      className="bg-blue-500 text-white px-4 py-2 mt-4 rounded hover:bg-blue-600 transition"
    >
      Plătește acum
    </button>
  );
};

export default Checkout;
