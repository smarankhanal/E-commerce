// import React from "react";
// import AnchorTag from "../Common/AnchorTag";
// import Logo from "../Common/Logo";
// import Search from "../Common/Search";
// import CartLogo from "../Cart/CartLogo";
// import { useSelector } from "react-redux";
// import { FiUser } from "react-icons/fi";
// import { Link } from "react-router-dom";
// export default function NavBar() {
//   const { user } = useSelector((state) => state.auth);

//   return (
//     <nav className="fixed top-0 left-0 z-50 w-full bg-(--nav-bg) shadow-[0_8px_20px_rgba(0,0,0,0.12)] p-1 overflow-x-hidden">
//       <div className="max-w-7xl mx-auto flex">
//         {/* Logo */}
//         <Logo />

//         {/* Right Side */}
//         <div className="flex flex-col items-end gap-3 flex-1">
//           {/* Search + Cart + User */}

//           {/* Cart */}
//           <div className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-110">
//             <CartLogo />

//             {/* User */}
//             {user && (
//               <Link
//                 to="/profile"
//                 className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-110 cursor-pointer"
//               >
//                 <FiUser className="text-white text-xl" />
//               </Link>
//             )}
//           </div>

//           {/* Navigation */}
//           <div className="flex gap-8 text-sm font-medium">
//             <AnchorTag text="Home" to={"/"} />
//             <AnchorTag text="Products" to={"/products"} />

//             {!user && (
//               <>
//                 <AnchorTag text="Login" to={"/login"} />
//                 <AnchorTag text="Sign Up" to={"/signup"} />
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }

import React from "react";
import AnchorTag from "../Common/AnchorTag";
import Logo from "../Common/Logo";
import Search from "../Common/Search";
import CartLogo from "../Cart/CartLogo";
import { useSelector } from "react-redux";
import { FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function NavBar() {
  const { user } = useSelector((state) => state.auth);
  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-(--nav-bg) shadow-[0_8px_20px_rgba(0,0,0,0.12)] px-4 py-3 overflow-x-hidden">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
        {/* Logo */}
        <div className="shrink-0">
          <Logo />
        </div>

        {/* Right Side: Nav links + Cart + User */}
        <div className="flex items-center gap-3 sm:gap-6">
          {/* Navigation links */}
          <div className="flex items-center gap-2 xs:gap-3 sm:gap-6 text-xs sm:text-sm font-medium whitespace-nowrap">
            <AnchorTag text="Home" to={"/"} />
            <AnchorTag text="Products" to={"/products"} />

            {!user && (
              <>
                <AnchorTag text="Login" to={"/login"} />
                <AnchorTag text="Sign Up" to={"/signup"} />
              </>
            )}
          </div>

          {/* Icons */}
          <div className="flex items-center gap-1 sm:gap-2">
            {user && (
              <Link
                to="/profile"
                className="p-1.5 sm:p-2 outline-none rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-110 cursor-pointer"
              >
                <FiUser className="text-white text-lg sm:text-xl" />
              </Link>
            )}
            {user && (
              <div className="p-1.5 sm:p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-110">
                <CartLogo />
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
