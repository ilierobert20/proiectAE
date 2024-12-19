import { createSlice } from "@reduxjs/toolkit";

// Funcții pentru a salva și încărca datele din localStorage
const loadCartFromLocalStorage = () => {
  const savedCart = localStorage.getItem("cart");
  return savedCart ? JSON.parse(savedCart) : [];
};

const saveCartToLocalStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: loadCartFromLocalStorage(),
  },
  reducers: {
    addItem: (state, action) => {
      const { id, name, price } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity += 1; // Dacă produsul există, crește cantitatea
      } else {
        state.items.push({ id, name, price, quantity: 1 }); // Adaugă produs nou cu cantitate = 1
      }
      saveCartToLocalStorage(state.items);
    },
    removeItem: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem.quantity > 1) {
        existingItem.quantity -= 1; // Dacă sunt mai multe, scade cantitatea
      } else {
        state.items = state.items.filter((item) => item.id !== id); // Elimină produsul complet
      }
      saveCartToLocalStorage(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cart");
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
