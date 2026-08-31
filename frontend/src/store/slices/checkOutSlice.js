import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axios";

export const calculateCheckout = createAsyncThunk(
  "checkout/calculateCheckout",
  async ({ products, shippingAddress, orderNotes }, { rejectWithValue }) => {
    try {
      const response = await api.post("/order/calculate-checkout-pricing", {
        products,
        shippingAddress,
        orderNotes,
      });
      return response.data?.data || response.data;
    } catch (error) {
      const serializedError = {
        error:
          error.response?.data?.message ||
          error.message ||
          "Failed to calculate checkout",
        status: error.response?.status,
        message: error.response?.message,
      };

      return rejectWithValue(serializedError);
    }
  },
);
export const placeOrder = createAsyncThunk(
  "checkout/placeOrder",
  async (
    { products, shippingAddress, orderNotes, paymentMethod },
    { rejectWithValue },
  ) => {
    try {
      const response = await api.post("/order/checkout", {
        products,
        shippingAddress,
        orderNotes,
        paymentMethod,
      });

      return response.data?.data || response.data;
    } catch (error) {
      const serializedError = {
        error:
          error.response?.data?.message ||
          error.message ||
          "Failed to calculate checkout",
        status: error.response?.status,
        message: error.response?.message,
      };

      return rejectWithValue(serializedError);
    }
  },
);

const initialState = {
  checkoutDetails: null,
  order: null,
  error: null,
  status: "idle",
};
const checkOutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(calculateCheckout.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(calculateCheckout.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.checkoutDetails = action.payload;
      })
      .addCase(calculateCheckout.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(placeOrder.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })

      .addCase(placeOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.order = action.payload;
        state.error = null;
      })

      .addCase(placeOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});
export default checkOutSlice.reducer;
