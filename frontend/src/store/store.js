import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";

import authSlice from "./slices/authSlice.js";
import registerSlice from "./slices/registerSlice.js";
import productSlice from "./slices/productSlice.js";
import collectionSlice from "./slices/collectionSlice.js";
import cartSlice from "./slices/cartSlice.js";
import reviewSlice from "./slices/reviewSlice.js";
import searchSlice from "./slices/searchSlice.js";
import historySlice from "./slices/historySlice.js";
import checkOutSlice from "./slices/checkOutSlice.js";

const storage = {
  getItem: (key) => {
    try {
      return Promise.resolve(localStorage.getItem(key));
    } catch (err) {
      return Promise.resolve(null);
    }
  },

  setItem: (key, value) => {
    try {
      localStorage.setItem(key, value);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  },

  removeItem: (key) => {
    try {
      localStorage.removeItem(key);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  },
};

// Cart persistence configuration
const cartPersistConfig = {
  key: "cart",
  storage,
};

const persistedCartReducer = persistReducer(cartPersistConfig, cartSlice);

const store = configureStore({
  reducer: {
    auth: authSlice,
    register: registerSlice,
    product: productSlice,
    collection: collectionSlice,

    // Persist cart
    cart: persistedCartReducer,

    review: reviewSlice,
    search: searchSlice,
    history: historySlice,
    checkout: checkOutSlice,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/PAUSE",
          "persist/PURGE",
          "persist/REGISTER",
        ],
      },
    }),
});

export const persistor = persistStore(store);

export default store;
