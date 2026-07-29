import React from "react";
import { NavBar, Footer } from "./components";
import ProductDetails from "./pages/ProductDetails";

export default function App() {
  return (
    <>
      <NavBar />
      <ProductDetails />
      <Footer />
    </>
  );
}
