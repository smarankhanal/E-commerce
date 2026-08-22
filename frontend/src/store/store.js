import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice.js";
import registerSlice from "./slices/registerSlice.js";
import productSlice from "./slices/productSlice.js";
import collectionSlice from "./slices/collectionSlice.js";
const store = configureStore({
  reducer: {
    auth: authSlice,
    register: registerSlice,
    product: productSlice,
    collection: collectionSlice,
  },
});
export default store;
