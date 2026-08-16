import React from "react";
import { Logout } from "../components";
import { Settings } from "../components";
import { History } from "../components";

export default function Profile() {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">User Profile</h1>
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        <Settings />
      </div>
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        <History />
      </div>
      <div className="p-4 flex justify-end border-t border-gray-200">
        <Logout />
      </div>
    </div>
  );
}
