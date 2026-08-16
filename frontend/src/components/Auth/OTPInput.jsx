import React, { useRef } from "react";

export default function OTPInput({ value, onChange }) {
  const inputs = useRef([]);

  const otp = value.padEnd(6, "").split("");

  const handleChange = (inputValue, index) => {
    if (!/^\d?$/.test(inputValue)) return;

    const newOtp = [...otp];

    newOtp[index] = inputValue;

    const newValue = newOtp.join("");

    onChange(newValue);

    if (inputValue && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex justify-center gap-3 mb-10">
      {Array.from({ length: 6 }).map((_, idx) => (
        <input
          key={idx}
          ref={(el) => {
            inputs.current[idx] = el;
          }}
          type="text"
          inputMode="numeric"
          value={otp[idx] || ""}
          maxLength={1}
          onChange={(e) => handleChange(e.target.value, idx)}
          onKeyDown={(e) => handleKeyDown(e, idx)}
          className="h-14 w-14 rounded-lg border border-gray-300 text-center text-xl font-bold outline-none transition-all duration-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
        />
      ))}
    </div>
  );
}
