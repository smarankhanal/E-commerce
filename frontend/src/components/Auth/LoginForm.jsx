import React, { useState } from "react";
import Input from "../Common/Input";
import Button from "../Common/Button";
import PasswordInput from "./PasswordInput";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/slices/authSlice.js";

export default function LoginForm() {
  const { register, handleSubmit } = useForm();
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.auth);
  const login = async (data) => {
    try {
      await dispatch(loginUser(data)).unwrap();
      navigate("/");
    } catch (error) {
      setErrorMessage(error?.message || "Login failed !! Try again");
    }
  };

  return (
    <div className="space-y-6">
      {/* Heading */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Login</h1>
      </div>

      {/* Form */}
      <form className="space-y-4" onSubmit={handleSubmit(login)}>
        {/* Email / Phone */}
        <Input
          label="Email/PhoneNumber"
          type="text"
          placeholder="Enter your email or phone number"
          {...register("identifier", {
            required: true,
          })}
        />

        {/* Password */}
        <PasswordInput
          label="Password"
          placeholder="Enter your password"
          {...register("password", {
            required: true,
          })}
        />

        {/* Login Error */}
        {errorMessage && (
          <p className="mb-5 font-semibold text-red-500">{errorMessage}</p>
        )}

        {/* Login Button + Forgot Password */}
        <div className="flex items-center justify-between">
          <Button
            type="submit"
            disabled={status === "loading"}
            text={status === "loading" ? "Logging in..." : "Login"}
          />

          <p
            className="cursor-pointer text-blue-600 hover:underline hover:opacity-60"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot Password?
          </p>
        </div>

        {/* Signup */}
        <p className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <span
            className="cursor-pointer font-semibold text-blue-600 hover:underline"
            onClick={() => navigate("/Signup")}
          >
            SignUp
          </span>
        </p>
      </form>
    </div>
  );
}
