import { createSlice } from "@reduxjs/toolkit";
import { normalizeCartItem } from "../../utils/cart";

const initialState = {
  items: [],
  subTotal: 0,
  totalQuantity: 0,
};

export const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {
    addToCart: (state, action) => {
      const { product, selectedSize } = action.payload;
      const item = normalizeCartItem(product, selectedSize);
      const existingItem = state.items.find(
        (cartItem) => cartItem.id === item.id,
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push(item);
      }

      state.totalQuantity += 1;
      state.subTotal += Number(product.price) || 0;
    },

    removeCart: (state, action) => {
      const { productId, selectedSize } = action.payload;

      const existingItem = state.items.find(
        (item) =>
          item.productId === productId && item.selectedSize === selectedSize,
      );

      if (!existingItem) {
        return;
      }

      state.subTotal -= Number(existingItem.price) * existingItem.quantity;

      state.totalQuantity -= existingItem.quantity;

      state.items = state.items.filter(
        (item) =>
          !(item.productId === productId && item.selectedSize === selectedSize),
      );

      state.subTotal = Math.max(0, state.subTotal);
      state.totalQuantity = Math.max(0, state.totalQuantity);
    },

    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.subTotal = 0;
    },

    increaseQty: (state, action) => {
      const { productId, selectedSize } = action.payload;

      const existingItem = state.items.find(
        (item) =>
          item.productId === productId && item.selectedSize === selectedSize,
      );

      if (existingItem) {
        existingItem.quantity += 1;

        state.subTotal += Number(existingItem.price) || 0;
        state.totalQuantity += 1;
      }
    },

    decreaseQty: (state, action) => {
      const { productId, selectedSize } = action.payload;

      const existingItem = state.items.find(
        (item) =>
          item.productId === productId && item.selectedSize === selectedSize,
      );

      if (!existingItem) return;

      if (existingItem.quantity > 1) {
        existingItem.quantity -= 1;

        state.subTotal -= Number(existingItem.price) || 0;
        state.totalQuantity -= 1;
      } else {
        state.items = state.items.filter(
          (item) =>
            !(
              item.productId === productId && item.selectedSize === selectedSize
            ),
        );

        state.subTotal -= Number(existingItem.price) || 0;
        state.totalQuantity -= 1;
      }
    },
  },
});
export default cartSlice.reducer;
export const { addToCart, removeCart, clearCart, decreaseQty, increaseQty } =
  cartSlice.actions;
