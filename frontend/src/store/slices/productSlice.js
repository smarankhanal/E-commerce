import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axios";

export const getAllProduct = createAsyncThunk(
  "product/getAllProduct",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/shop/");

      return response.data?.data || response.data;
    } catch (error) {
      const serializedError = {
        message:
          error.response?.data?.message ||
          error.message ||
          "Product fetch failed",
        status: error.response?.status,
        data: error.response?.data,
      };

      return rejectWithValue(serializedError);
    }
  },
);
export const getSingleProduct = createAsyncThunk(
  "product/getSingleProduct",
  async (sku, { rejectWithValue }) => {
    try {
      const response = await api.get(`/shop/${sku}`);
      return response.data;
    } catch (error) {
      const serializedError = {
        message:
          error.response?.data.message ||
          error.message ||
          "Failed to fetch product",
        status: error.response?.status,
        data: error.response?.data,
      };
      return rejectWithValue(serializedError);
    }
  },
);
const initialState = {
  products: [],
  error: null,
  status: "idle",
  product: null,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(getAllProduct.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(getAllProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })

      .addCase(getAllProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message || "Product fetch failed";
      })
      .addCase(getSingleProduct.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(getSingleProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.product = action.payload.data[0];
      })

      .addCase(getSingleProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message || "Product fetch failed";
      });
  },
});

export default productSlice.reducer;
