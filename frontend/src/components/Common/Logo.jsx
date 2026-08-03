import React from "react";
import logo from "../../assets/images/logo.png";

export default function Logo() {
  return (
    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg">
      <img src={logo} alt="Shop Logo" className="h-13 w-13 object-contain" />
    </div>
  );
}
