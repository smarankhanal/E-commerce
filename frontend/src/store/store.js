import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice.js";
import registerSlice from "./slices/registerSlice.js";
import productSlice from "./slices/productSlice.js";
import collectionSlice from "./slices/collectionSlice.js";
import cartSlice from "./slices/cartSlice.js";
import reviewSlice from "./slices/reviewSlice.js";
import searchSlice from "./slices/searchSlice.js";
import historySlice from "./slices/historySlice.js";
const store = configureStore({
  reducer: {
    auth: authSlice,
    register: registerSlice,
    product: productSlice,
    collection: collectionSlice,
    cart: cartSlice,
    review: reviewSlice,
    search: searchSlice,
    history: historySlice,
  },
});
export default store;
