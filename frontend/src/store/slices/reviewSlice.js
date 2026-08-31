import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axios";
export const getReview = createAsyncThunk(
  "review/getReview",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/reviews/${productId}`);
      return response.data?.data || response.data;
    } catch (error) {
      const serializedError = {
        error:
          error.response?.data?.message ||
          error.message ||
          "Review fetch failed",
        status: error.response?.status,
        data: error.response?.data,
      };
      return rejectWithValue(serializedError);
    }
  },
);
export const addReview = createAsyncThunk(
  "review/addReview",
  async ({ productId, review_text, star_rating }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/reviews/${productId}`, {
        review_text,
        star_rating,
      });
      return response.data?.data || response.data;
    } catch (error) {
      const serializedError = {
        error:
          error.response?.data?.message ||
          error.message ||
          "Review fetch failed",
        status: error.response?.status,
        data: error.response?.data,
      };
      return rejectWithValue(serializedError);
    }
  },
);
const initialState = {
  reviews: [],
  error: null,
  status: "idle",
};
export const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getReview.pending, (state) => {
        state.error = null;
        state.status = "loading";
      })
      .addCase(getReview.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.status = "succedded";
      })
      .addCase(getReview.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(addReview.pending, (state) => {
        state.error = null;
        state.status = "loading";
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.status = "succedded";
        state.reviews.unshift(action.payload);
      })
      .addCase(addReview.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      });
  },
});
export default reviewSlice.reducer;
