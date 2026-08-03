import React, { useState } from "react";
import Input from "../Common/Input";
import { BsEye, BsEyeSlash } from "react-icons/bs";

export default function PasswordInput({ name, label, text, placeholder }) {
  const [showPassword, setShowPassWord] = useState(false);
  return (
    <div className="relative">
      <Input
        name={name}
        label={label}
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
      />
      {showPassword ? (
        <BsEye
          className="absolute right-4 top-[70%] -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700"
          onClick={() => setShowPassWord(false)}
        />
      ) : (
        <BsEyeSlash
          className="absolute right-4 top-[70%] -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700"
          onClick={() => setShowPassWord(true)}
        />
      )}
    </div>
  );
}
