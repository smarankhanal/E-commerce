import React from "react";
import AnchorTag from "../AnchorTag";
import Logo from "../Logo";
import Search from "../Search";
import CartLogo from "../CartLogo";

export default function NavBar() {
  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-(--nav-bg) shadow-[0_8px_20px_rgba(0,0,0,0.12)] p-1">
      <div className="max-w-7xl mx-auto flex  ">
        {/* Logo */}
        <Logo />

        {/* Right Side */}
        <div className="flex flex-col items-end gap-3 flex-1">
          {/* Search + Cart */}
          <div className="flex items-center gap-4">
            <Search />

            <div className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-110">
              <CartLogo />
            </div>
          </div>

          {/* Navigation */}
          <div className="flex gap-8 text-sm font-medium">
            <AnchorTag text="Home" />
            <AnchorTag text="Login" />
            <AnchorTag text="Sign Up" />
          </div>
        </div>
      </div>
    </nav>
  );
}
