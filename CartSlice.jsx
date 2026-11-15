import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: []
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add a new product, or increase its quantity if it is already in the cart.
    addItem: (state, action) => {
      const product = action.payload;
      if (!product || product.id === undefined) return;

      const existingItem = state.items.find((item) => item.id === product.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
    },

    // Remove one product completely from the cart.
    removeItem: (state, action) => {
      const productId =
        action.payload && typeof action.payload === "object"
          ? action.payload.id
          : action.payload;

      state.items = state.items.filter((item) => item.id !== productId);
    },

    // Set a product quantity. A quantity of zero or less removes the product.
    updateQuantity: (state, action) => {
      const { id, productId, quantity, change } = action.payload || {};
      const targetId = id !== undefined ? id : productId;
      const item = state.items.find((product) => product.id === targetId);
      if (!item) return;

      const nextQuantity =
        quantity !== undefined ? Number(quantity) : item.quantity + Number(change || 0);

      if (!Number.isFinite(nextQuantity) || nextQuantity <= 0) {
        state.items = state.items.filter((product) => product.id !== targetId);
      } else {
        item.quantity = Math.floor(nextQuantity);
      }
    }
  }
});

export const { addItem, removeItem, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
