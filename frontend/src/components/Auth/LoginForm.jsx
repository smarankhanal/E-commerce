import React from "react";
import Input from "../Common/Input";
import Button from "../Common/Button";
import PasswordInput from "./PasswordInput";
import { useNavigate } from "react-router-dom";

export default function LogninForm() {
  const navigate = useNavigate();
  return (
    <div className="space-y-6">
      {/* Heading */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Login</h1>
      </div>

      {/* Form */}
      <form className="space-y-4">
        <Input
          label="Email/Number"
          type="text"
          placeholder="Enter your email or phone number"
        />

        <PasswordInput
          label="Password"
          type="password"
          placeholder="Create a password"
        />
        <div className="flex justify-between items-center">
          <Button text="Login" onClick={() => navigate("/")} />

          <p
            className="cursor-pointer  text-blue-600 hover:underline hover:opacity-60"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot Password?
          </p>
        </div>
        <p className="text-center text-sm text-gray-600">
          Don't have an account?
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
