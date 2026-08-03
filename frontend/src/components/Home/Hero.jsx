import React from "react";
import hero from "../../assets/images/hero-image.jpg";
import Button from "../Common/Button";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();
  return (
    <section className="w-full relative">
      <img src={hero} alt="Hero Banner" className="w-full h-125 object-cover" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
        <Button text="Shop Now" onClick={() => navigate("/shop")} />
      </div>
    </section>
  );
}
