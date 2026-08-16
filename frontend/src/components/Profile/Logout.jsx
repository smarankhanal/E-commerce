import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../store/slices/authSlice";

export default function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate("/login");
    } catch (err) {
      console.log("logout failed", err);
    }
  };
  return (
    <button
      type="button"
      className="px-4 py-2 rounded-lg text-sm font-bold
                 bg-red-600 text-white
                 hover:bg-red-700 active:bg-red-800
                 transition-all duration-300 shadow-sm cursor-pointer"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
}
