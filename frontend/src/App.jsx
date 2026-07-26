import React from "react";
import {
  NavBar,
  Hero,
  Footer,
  BestSeller,
  CollectionSlider,
} from "./components";

export default function App() {
  return (
    <>
      <NavBar />
      <Hero />
      <BestSeller />
      <CollectionSlider />
      <Footer />
    </>
  );
}
