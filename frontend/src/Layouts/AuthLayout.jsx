import React from "react";
import { Footer, NavBar } from "../components";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <>
      <NavBar />
      <main className="mt-30">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
