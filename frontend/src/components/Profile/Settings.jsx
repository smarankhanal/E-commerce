import React from "react";
import { IoSettings } from "react-icons/io5";

export default function Settings() {
  return (
    <div>
      <div className="flex items-center gap-4">
        <IoSettings className="text-blue-600" />
        <span className="font-bold text-gray-700">Settings</span>
      </div>
      <div className="space-y-2">
        <div className="p-3 rounded-lg cursor-pointer hover:bg-gray-100 transition-all duration-200">
          <p className="text-gray-600 font-medium">User Details</p>
        </div>

        <div className="p-3 rounded-lg cursor-pointer hover:bg-gray-100 transition-all duration-200">
          <p className="text-gray-600 font-medium">Update Account Details</p>
        </div>

        <div className="p-3 rounded-lg cursor-pointer hover:bg-gray-100 transition-all duration-200">
          <p className="text-gray-600 font-medium">Change Password</p>
        </div>
      </div>
    </div>
  );
}
