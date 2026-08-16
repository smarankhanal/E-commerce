import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice.js";
import registerSlice from "./slices/registerSlice.js";
const store = configureStore({
  reducer: {
    auth: authSlice,
    register: registerSlice,
  },
});
export default store;
