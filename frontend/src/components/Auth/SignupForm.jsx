import React from "react";
import Input from "../Common/Input";
import Button from "../Common/Button";
import { useNavigate } from "react-router-dom";

export default function SignupForm() {
  const navigate = useNavigate();
  return (
    <div className="space-y-6">
      {/* Heading */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">Create Account</h1>
      </div>

      {/* Form */}
      <form className="space-y-4">
        <Input
          label="Full Name"
          type="text"
          placeholder="Enter your full name"
        />

        <Input label="Email" type="email" placeholder="Enter your email" />

        <Input
          label="Password"
          type="password"
          placeholder="Create a password"
        />

        <Input label="Phone Number" type="tel" placeholder="98XXXXXXXX" />

        <Button text="Sign Up" onClick={() => navigate("/Login")} />
      </form>

      {/* Footer */}
      <p className="text-center text-sm text-gray-600">
        Already have an account?
        <span className="cursor-pointer font-semibold text-blue-600 hover:underline">
          Login
        </span>
      </p>
    </div>
  );
}
