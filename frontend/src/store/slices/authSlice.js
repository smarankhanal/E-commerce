import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axios";
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ identifier, password }, { rejectWithValue }) => {
    try {
      const response = await api.post("/users/login", {
        identifier,
        password,
      });

      return response.data?.data || response.data;
    } catch (error) {
      const serializedError = {
        message:
          error.response?.data?.message || error.message || "Login failed",
        status: error.response?.status,
        data: error.response?.data,
      };

      return rejectWithValue(serializedError);
    }
  },
);
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.post("/users/logout");
      return response.data?.data || response.data;
    } catch (error) {
      const serializedError = {
        message:
          error.response?.data?.message || error.message || "Logout failed",
        status: error.response.status,
        data: error.response?.data,
      };

      return rejectWithValue(serializedErrors);
    }
  },
);
export const resendOtp = createAsyncThunk(
  "auth/resendOtp",
  async ({ email, purpose }, { rejectWithValue }) => {
    try {
      const response = await api.post("/otp/re-send", { email, purpose });
      return response.data?.data || response.data;
    } catch (error) {
      const serializedError = {
        message:
          error.response?.data?.message || error.message || "Login failed",
        status: error.response.status,
        data: error.response?.data,
      };
      return rejectWithValue(serializedError);
    }
  },
);
const initialState = {
  user: null,
  error: null,
  status: "idle",
  loading: true,
  otpSent: false,
  otpVerified: false,
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.payload?.message || "Login failed";
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.status = "loading";
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.status = "succeeded";
        state.user = null;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.payload?.message || "Login failed";
      })
      .addCase(resendOtp.pending, (state) => {
        state.loading = true;
        state.status = "loading";
        state.error = null;
      })

      .addCase(resendOtp.fulfilled, (state) => {
        state.loading = false;
        state.status = "succeeded";
        state.error = null;
        state.otpSent = true;
      })

      .addCase(resendOtp.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.payload?.message || "Failed to send OTP";
      });
  },
});
export default authSlice.reducer;
