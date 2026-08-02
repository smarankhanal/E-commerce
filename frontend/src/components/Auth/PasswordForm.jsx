import React from "react";
import Input from "../Input";
import Button from "../Button";
import PasswordInput from "./PasswordInput";

export default function PasswordForm() {
  return (
    <div className="space-y-6">
      {/* Heading */}
      <div className="text-center">
        <h1 className="text-2xl font-semibold  text-gray-900">
          Forgot Password
        </h1>
      </div>

      {/* Form */}
      <form className="space-y-4">
        <Input label="Email" type="text" placeholder="Enter your email" />

        <PasswordInput
          label=" New Password"
          type="password"
          placeholder="New Password"
        />
        <PasswordInput
          label="Confirm Password"
          type="password"
          placeholder="Confirm Password"
        />

        <div className="flex justify-between items-center">
          <Button text="Change Password" />
        </div>
      </form>
    </div>
  );
}
