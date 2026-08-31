import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axios";
export const getOrderHistory = createAsyncThunk(
  "history/getOrderHistory",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/order/order-history");
      return response.data?.data || response.data;
    } catch (error) {
      const serializedError = {
        error:
          error.response?.data?.message ||
          error.message ||
          "Failed to fetch order history",
        status: error.response?.status,
        data: error.response?.data,
      };
      return rejectWithValue(serializedError);
    }
  },
);
export const getSingleHistory = createAsyncThunk(
  "history/getSingleHistory",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/order/order-history/${orderId}`);

      return response.data.data;
    } catch (error) {
      const serializedError = {
        error:
          error.response?.data?.message ||
          error.message ||
          "Failed to fetch order history",
        status: error.response?.status,
        data: error.response?.data,
      };
      return rejectWithValue(serializedError);
    }
  },
);
const initialState = {
  orders: [],
  singleOrderItems: null,
  error: null,
  status: "idle",
};
export const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrderHistory.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getOrderHistory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload;
      })
      .addCase(getOrderHistory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message || "History fetch failed";
      })
      .addCase(getSingleHistory.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getSingleHistory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.singleOrderItems = action.payload;
      })
      .addCase(getSingleHistory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message || "Single History fetch failed";
      });
  },
});
export default historySlice.reducer;
