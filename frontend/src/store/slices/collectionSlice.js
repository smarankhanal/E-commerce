import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axios";
export const getAllCollections = createAsyncThunk(
  "collection/getAllCollections",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/collections/");

      return response.data?.data || response.data;
    } catch (error) {
      const serializedError = {
        message:
          error.response?.data?.message ||
          error.message ||
          "Collection fetch failed",
        status: error.response?.status,
        data: error.response?.data,
      };
      return rejectWithValue(serializedError);
    }
  },
);
export const getSingleCollection = createAsyncThunk(
  "collection/getSingleCollection",
  async (slug, { rejectWithValue }) => {
    try {
      const response = await api.get(`/collections/${slug}`);

      return response.data?.data || response.data;
    } catch (error) {
      const serializedError = {
        message:
          error.response?.data?.message ||
          error.message ||
          "Collection fetch failed",
        status: error.response?.status,
        data: error.response?.data,
      };
      return rejectWithValue(serializedError);
    }
  },
);
const initialState = {
  collections: [],
  collection: null,
  collectionProducts: [],
  error: null,
  status: "idle",
};
export const collectionSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCollections.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getAllCollections.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.collections = action.payload;
      })
      .addCase(getAllCollections.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message || "Collection fetch failed";
      })
      .addCase(getSingleCollection.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getSingleCollection.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.collection = action.payload.collection;
        state.collectionProducts = action.payload.products;
      })
      .addCase(getSingleCollection.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message || "Collection fetch failed";
      });
  },
});
export default collectionSlice.reducer;
