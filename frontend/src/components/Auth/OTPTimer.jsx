import React, { useEffect, useRef, useState } from "react";

const OTP_TIME = 300; // 3 minutes

export default function OTPTimer({ onResend }) {
  const [timeLeft, setTimeLeft] = useState(OTP_TIME);
  const timerRef = useRef(null);

  const startTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    setTimeLeft(OTP_TIME);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    startTimer();

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const handleResend = async () => {
    try {
      // Parent handles API request
      await onResend();

      // Restart timer only after successful resend
      startTimer();
    } catch (error) {
      console.error("Failed to resend OTP:", error);
    }
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const formattedTime = `${String(minutes).padStart(
    2,
    "0",
  )}:${String(seconds).padStart(2, "0")}`;

  return (
    <div className="mt-4 text-center">
      {timeLeft > 0 ? (
        <p className="text-sm text-gray-500">
          Resend OTP in{" "}
          <span className="font-semibold text-blue-600">{formattedTime}</span>
        </p>
      ) : (
        <button
          type="button"
          onClick={handleResend}
          className="font-semibold text-blue-600 hover:underline"
        >
          Resend OTP
        </button>
      )}
    </div>
  );
}
