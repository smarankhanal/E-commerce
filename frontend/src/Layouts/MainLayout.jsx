import React from "react";
import { Footer, NavBar } from "../components";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <>
      <NavBar />
      <main className="min-h-screen mt-30">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
