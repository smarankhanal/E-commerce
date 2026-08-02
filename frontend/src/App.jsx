import React from "react";
import { NavBar, Footer } from "./components";
import Cart from "./pages/Cart";
import ProductDetails from "./pages/ProductDetails";

export default function App() {
  return (
    <>
      <NavBar />
      <Cart />
      {/* <ProductDetails /> */}
      <Footer />
    </>
  );
}
