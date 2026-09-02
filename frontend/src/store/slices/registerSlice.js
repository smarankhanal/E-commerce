import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axios.js";
//=======REGISTERUSER=======//
export const registerUser = createAsyncThunk(
  "register/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post("/users/sign-up", userData);
      return response.data?.data || response.data;
    } catch (error) {
      const errors = error.response?.data?.errors || [];
      const fieldErrors = {};
      errors.forEach((err) => {
        fieldErrors[err.field] = err.message;
      });
      return rejectWithValue({
        message: error.response?.data?.message,
        fieldErrors,
      });
    }
  },
);

//=======VERIFY-OTP=======//
export const verifyOtp = createAsyncThunk(
  "register/verifyOtp",
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const response = await api.post("/otp/verify-registration-otp", {
        email,
        otp,
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
const initialState = {
  user: null,
  email: null,
  loading: false,
  error: null,
  fieldErrors: {},
  otpVerified: false,
  status: "idle",
};
export const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //========RGISTER USER=======//

      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.fieldErrors = {};
        state.status = "loading";
      })

      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = null;
        state.email = action.payload?.email;
        state.error = null;
        state.fieldErrors = {};
        state.status = "rejected";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Registration failed";
        state.fieldErrors = action.payload?.fieldErrors || {};
        state.status = "succeded";
      })

      //=======VERIFY-OTP=======//
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = "rejected";
      })

      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.otpVerified = true;
        state.user = action.payload?.user || null;
        state.status = "rejected";
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to verify OTP";
        state.status = "succeded";
      });
  },
});
export default registerSlice.reducer;
