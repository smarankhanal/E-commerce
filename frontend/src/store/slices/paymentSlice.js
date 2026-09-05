import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axios";

//======= Initiate =======//
export const initiateEsewaPayment = createAsyncThunk(
  "payment/initiateEsewaPayment",
  async ({ orderId }, { rejectWithValue }) => {
    try {
      const response = await api.post("/payment/initiate", {
        orderId,
      });
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

//======= Verify =======//
export const verifyEsewaPayment = createAsyncThunk(
  "payment/verifyEsewaPayment",
  async ({ orderId, transaction_uuid }, { rejectWithValue }) => {
    try {
      const response = await api.post("/payment/success", {
        orderId,
        transaction_uuid,
      });
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
const initialState = {
  paymentUrl: null,
  paymentData: null,
  order: null,
  status: "idle",
  error: null,
  paymentVerified: false,
};
export const paymentSlice = createSlice({
  name: "reducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      //======= Initiate =======//

      .addCase(initiateEsewaPayment.pending, (state) => {
        state.status = "initiating";
        state.error = null;
      })
      .addCase(initiateEsewaPayment.fulfilled, (state, action) => {
        state.status = "initiated";
        state.paymentUrl = action.payload.paymentUrl;

        state.paymentData = action.payload.paymentData;
      })
      .addCase(initiateEsewaPayment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      //======= Verify =======//

      .addCase(verifyEsewaPayment.pending, (state) => {
        state.status = "verifying";
        state.error = null;
      })
      .addCase(verifyEsewaPayment.fulfilled, (state) => {
        state.status = "verified";
        state.paymentVerified = true;
        state.order = action.payload;
      })
      .addCase(verifyEsewaPayment.rejected, (state, action) => {
        state.status = "failed";
        state.paymentVerified = false;
        state.error = action.payload;
      });
  },
});
export default paymentSlice.reducer;
