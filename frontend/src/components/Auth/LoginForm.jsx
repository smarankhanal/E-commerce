import React from "react";
import Input from "../Input";
import Button from "../Button";

export default function LogninForm() {
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

        <Input
          label="Password"
          type="password"
          placeholder="Create a password"
        />
        <div className="flex justify-between items-center">
          <Button text="Login" />

          <p className="cursor-pointer  text-blue-600 hover:underline hover:opacity-60">
            Forgot Password?
          </p>
        </div>
      </form>
    </div>
  );
}
