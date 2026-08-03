import React from "react";
import { Button, OTPInput } from "../../components";

export default function VerifyOTP() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Verify OTP</h1>
        <p className="mt-2 text-gray-500">
          Enter the 6-digit OTP sent to your email or phone number.
        </p>
      </div>

      <div className="text-center">
        <OTPInput />
        <Button text="Verify OTP" />
      </div>

      <div className="text-center">
        <p className="text-sm text-gray-500">Didn't receive the OTP?</p>

        <button className="mt-2 font-semibold text-blue-600 hover:underline">
          Resend OTP
        </button>
      </div>
    </div>
  );
}
