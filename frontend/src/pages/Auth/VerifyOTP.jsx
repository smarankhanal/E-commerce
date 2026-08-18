import React, { useState } from "react";
import { Button, OTPInput, OTPTimer, Toast } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { verifyOtp } from "../../store/slices/registerSlice";
import {
  verifyForgotPasswordOtp,
  resendOtp,
} from "../../store/slices/authSlice";
import { useLocation, useNavigate } from "react-router-dom";

export default function verifyOTP() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { error: registerError } = useSelector((state) => state.register);
  const purpose = location.state?.purpose;
  const email = location.state?.email;
  const [otp, setOtp] = useState("");

  const maskEmail = (email) => {
    if (!email) return;
    const [username, domain] = email.split("@");
    if (username.length <= 2) {
      return `${username[0]}***@${domain}`;
    }
    return `${username.slice(0, 2)}${"*".repeat(username.length - 2)}@${domain}`;
  };

  const verifyOTP = async () => {
    try {
      if (purpose === "registration") {
        await dispatch(verifyOtp({ email, otp })).unwrap();

        navigate("/login", {
          state: {
            toast: "User Registered successfully!",
          },
        });
      }

      if (purpose === "forgot-password") {
        await dispatch(verifyForgotPasswordOtp({ email, otp })).unwrap();

        navigate("/reset-password");
      }
    } catch (error) {
      console.error("OTP verification failed:");
    }
  };
  const handleResendOTP = async () => {
    await dispatch(resendOtp({ email, purpose })).unwrap();
  };

  return (
    <>
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Verify OTP</h1>
          <p className="mt-2 text-gray-500">
            Enter the 6-digit OTP sent to your email or phone number.
          </p>
        </div>
        {email && (
          <p className="text-center text-sm text-gray-500">
            OTP sent to{" "}
            <span className="font-semibold">{maskEmail(email)}</span>
          </p>
        )}

        <div className="text-center">
          <OTPInput value={otp} onChange={setOtp} />
          <Button
            text="Verify OTP"
            onClick={() => verifyOTP()}
            disabled={otp.length !== 6}
          />
          {registerError && (
            <p className="mt-2 text-red-600">{registerError}</p>
          )}
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-500">Didn't receive the OTP?</p>

          <OTPTimer onResend={handleResendOTP} />
        </div>
      </div>
    </>
  );
}
