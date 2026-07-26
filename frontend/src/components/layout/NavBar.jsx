import React from "react";
import AnchorTag from "../AnchorTag";
import Logo from "../Logo";
import Search from "../Search";
import { MdOutlineShoppingCart } from "react-icons/md";

export default function NavBar() {
  return (
    <nav className="w-full bg-(--nav-bg) shadow-[0_8px_20px_rgba(0,0,0,0.12)] p-2">
      <div className="max-w-7xl mx-auto flex  ">
        {/* Logo */}
        <Logo />

        {/* Right Side */}
        <div className="flex flex-col items-end gap-3 flex-1">
          {/* Search + Cart */}
          <div className="flex items-center gap-4">
            <Search />

            <MdOutlineShoppingCart
              size={30}
              className="text-(--nav-text) cursor-pointer hover:opacity-80"
            />
          </div>

          {/* Navigation */}
          <div className="flex gap-8">
            <AnchorTag text="Home" />
            <AnchorTag text="Login" />
            <AnchorTag text="Sign Up" />
          </div>
        </div>
      </div>
    </nav>
  );
}
