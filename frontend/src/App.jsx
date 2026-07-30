import React from "react";
import { NavBar, Footer } from "./components";
import VerifyOTP from "./pages/Auth/VerifyOTP";

export default function App() {
  return (
    <>
      <NavBar />
      <VerifyOTP />
      <Footer />
    </>
  );
}
