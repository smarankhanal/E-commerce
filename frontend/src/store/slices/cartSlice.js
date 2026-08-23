import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalPrice: 0,
  totalQuantity: 0,
};

export const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;

      const existingItem = state.items.find(
        (item) => item._id === product._id,
        // &&
        //   item.selectedSize === product.selectedSize,
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          ...product,
          // selectedSize: product.selectedSize,
          quantity: 1,
        });
      }

      state.totalQuantity += 1;
      state.totalPrice += Number(product.price) || 0;
    },

    removeCart: (state, action) => {
      const product = action.payload;

      const existingItem = state.items.find(
        (item) => item._id === product._id,
        // && item.selectedSize === selectedSize,
      );

      if (existingItem) {
        state.totalPrice -= Number(existingItem.price) * existingItem.quantity;

        state.totalQuantity -= existingItem.quantity;

        state.items = state.items.filter(
          (item) =>
            !(item._id === product._id && item.selectedSize === selectedSize),
        );
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },

    increaseQty: (state, action) => {
      const productId = action.payload;

      const existingItem = state.items.find(
        (item) => item._id === productId,
        // && item.selectedSize === selectedSize,
      );

      if (existingItem) {
        existingItem.quantity += 1;

        state.totalPrice += Number(existingItem.price) || 0;
        state.totalQuantity += 1;
      }
    },

    decreaseQty: (state, action) => {
      const productId = action.payload;

      const existingItem = state.items.find(
        (item) => item._id === productId,
        // && item.selectedSize === selectedSize,
      );

      if (!existingItem) return;

      if (existingItem.quantity > 1) {
        existingItem.quantity -= 1;

        state.totalPrice -= Number(existingItem.price) || 0;
        state.totalQuantity -= 1;
      } else {
        state.items = state.items.filter(
          (item) =>
            !(
              (item._id === productId)
              // && item.selectedSize === selectedSize
            ),
        );

        state.totalPrice -= Number(existingItem.price) || 0;
        state.totalQuantity -= 1;
      }
    },
  },
});

export const { addToCart, removeCart, clearCart, decreaseQty, increaseQty } =
  cartSlice.actions;

export default cartSlice.reducer;
