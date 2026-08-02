import React from "react";
import { NavBar, Footer } from "./components";
import Checkout from "./pages/Checkout";

export default function App() {
  return (
    <>
      <NavBar />
      <Checkout />
      <Footer />
    </>
  );
}
