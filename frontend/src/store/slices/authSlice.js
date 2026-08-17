import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axios";

//========Login=======//

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

// =======Logout======= //

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

//======ResendOtp=======//

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

//=======Forgot-Password=======//
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post("/users/forgot-password", userData);
      return response.data?.data;
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
//=======VerifyForgotPasswordOTP=======//
export const verifyForgotPasswordOtp = createAsyncThunk(
  "auth/verifyForogtPasswordOtp",
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const response = await api.post("/otp/verify-forgot-password-otp", {
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

//=======RESET PASSWORD=======//
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ newPassword, resetToken }, { rejectWithValue }) => {
    try {
      console.log(newPassword, resetToken);
      const response = await api.post("/users/reset-password", {
        newPassword,
        resetToken,
      });
      return response.data?.data || response.data;
    } catch (error) {
      const errors = error.response?.data?.errors || [];
      const fieldErrors = {};
      errors.forEach((err) => {
        fieldErrors[err.field] = err.message;
      });
      console.log(error);
      return rejectWithValue({
        message: error.response?.data?.message,
        fieldErrors,
      });
    }
  },
);
export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async ({ oldPassword, newPassword }, { rejectWithValue }) => {
    try {
      const response = await api.post("/users/change-password", {
        oldPassword,
        newPassword,
      });
      return response.data?.data || response.data;
    } catch (error) {
      const errors = error.response?.data?.errors || [];
      const fieldErrors = {};
      errors.forEach((err) => {
        fieldErrors[err.field] = err.message;
      });
      console.log(error);
      return rejectWithValue({
        message: error.response?.data?.message,
        fieldErrors,
      });
    }
  },
);
const initialState = {
  user: null,
  error: null,
  status: "idle",
  loading: true,
  fieldErrors: {},
  resetToken: null,
  otpSent: false,
  otpVerified: false,
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      //========Login=======//

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

      // =======Logout======= //

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

      //=======ResendOtp=======//

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
      })

      // =======ForgotPassword======= //

      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.status = "loading";
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.loading = false;
        state.status = "succeeded";
        state.user = null;
        state.error = null;
        state.otpSent = true;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.payload?.message;
      })

      //=======VERIFY-FORGOTPASSWORD-OTP=======//
      .addCase(verifyForgotPasswordOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(verifyForgotPasswordOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.otpVerified = true;

        state.resetToken = action.payload?.resetToken || null;
      })
      .addCase(verifyForgotPasswordOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to verify OTP";
      })

      //=======RESET-PASSWORD======//
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.otpVerified = true;
        state.user = action.payload?.user || null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.fieldErrors = action.payload?.fieldErrors || {};
      })

      //=======Change Password =======//

      .addCase(changePassword.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to change password";
      });
  },
});
export default authSlice.reducer;
