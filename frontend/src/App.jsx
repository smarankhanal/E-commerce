import React from "react";
import { Route, Routes } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

// Route Guards
import PublicRoute from "./components/Route/PublicRoute";
import ProtectedRoute from "./components/Route/ProtectedRoute";

// Pages
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import ProductDetails from "./pages/ProductDetails";
import Shop from "./pages/Shop";
import Collection from "./pages/Collection";
// Auth Pages
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import VerifyOTP from "./pages/Auth/VerifyOTP";
import ForgotPassWord from "./pages/Auth/ForgotPassWord";
import ResetPassword from "./pages/Auth/ResetPassword";

import OrderHistory from "./pages/History/OrderHistory";

import { ScrollToTop } from "./components";
import Profile from "./pages/Profile";
import SingleOrderHistory from "./pages/History/SingleOrderHistory";
import BillingDetailsForm from "./pages/BillingDetailsForm";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "./store/slices/authSlice";
import { useEffect } from "react";

export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <>
      <ScrollToTop />

      <Routes>
        {/* ==================== MAIN WEBSITE ==================== */}

        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />

          <Route path="/product/:sku" element={<ProductDetails />} />

          <Route path="/products" element={<Shop />} />

          <Route path="/collection/:slug" element={<Collection />} />

          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/billing-details"
            element={
              <ProtectedRoute>
                <BillingDetailsForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />

          <Route
            path="/order-history"
            element={
              <ProtectedRoute>
                <OrderHistory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/order-history/:orderId"
            element={
              <ProtectedRoute>
                <SingleOrderHistory />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* ==================== AUTHENTICATION ==================== */}

        <Route element={<AuthLayout />}>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          <Route
            path="/signup"
            element={
              <PublicRoute>
                <SignUp />
              </PublicRoute>
            }
          />

          <Route
            path="/verify-otp"
            element={
              <PublicRoute>
                <VerifyOTP />
              </PublicRoute>
            }
          />

          <Route
            path="/forgot-password"
            element={
              <PublicRoute>
                <ForgotPassWord />
              </PublicRoute>
            }
          />

          <Route
            path="/reset-password"
            element={
              <PublicRoute>
                <ResetPassword />
              </PublicRoute>
            }
          />
        </Route>
      </Routes>
    </>
  );
}
