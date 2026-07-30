import React, { useRef, useState } from "react";

export default function OTPInput() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputs = useRef([]);
  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < otp.length - 1) {
      inputs.current[index + 1].focus();
    }
  };
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };
  return (
    <div className="flex justify-center gap-3 mb-10">
      {otp.map((digit, idx) => (
        <input
          key={idx}
          ref={(el) => (inputs.current[idx] = el)}
          type="text"
          value={digit}
          maxLength={1}
          onChange={(e) => handleChange(e.target.value, idx)}
          onKeyDown={(e) => handleKeyDown(e, idx)}
          className="h-14 w-14 rounded-lg border border-gray-300 text-center text-xl font-bold outline-none transition-all duration-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
        />
      ))}
    </div>
  );
}
