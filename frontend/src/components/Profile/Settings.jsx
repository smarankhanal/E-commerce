import React, { useState } from "react";
import { IoSettings } from "react-icons/io5";
import ChangePassword from "../Auth/ChangePassword";
import UserDetails from "../Auth/UserDetails";
import UpdateAccountDetails from "../Auth/UpdateAccountDetails";
import Toast from "../Common/Toast";
import { useSelector } from "react-redux";

export default function Settings() {
  const [activePopup, setActivePopup] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const { user } = useSelector((state) => state.auth);

  const handleSuccess = (message) => {
    setActivePopup(null);
    setToastMessage(message);
    setShowToast(true);
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-4 flex items-center gap-4">
        <IoSettings className="text-blue-600" />
        <span className="font-bold text-gray-700">Settings</span>
      </div>

      {/* Settings Options */}
      <div className="space-y-2">
        <div
          onClick={() => setActivePopup("userDetails")}
          className="cursor-pointer rounded-lg p-3 transition-all duration-200 hover:bg-gray-100"
        >
          <p className="font-medium text-gray-600">User Details</p>
        </div>

        <div
          onClick={() => setActivePopup("updateAccount")}
          className="cursor-pointer rounded-lg p-3 transition-all duration-200 hover:bg-gray-100"
        >
          <p className="font-medium text-gray-600">Update Account Details</p>
        </div>

        <div
          onClick={() => setActivePopup("changePassword")}
          className="cursor-pointer rounded-lg p-3 transition-all duration-200 hover:bg-gray-100"
        >
          <p className="font-medium text-gray-600">Change Password</p>
        </div>
      </div>

      {/* User Details */}
      {activePopup === "userDetails" && (
        <UserDetails user={user} onClose={() => setActivePopup(null)} />
      )}

      {/* Update Account */}
      {activePopup === "updateAccount" && (
        <UpdateAccountDetails
          user={user}
          onClose={() => setActivePopup(null)}
          onSuccess={() =>
            handleSuccess("Account details updated successfully!")
          }
        />
      )}

      {/* Change Password */}
      {activePopup === "changePassword" && (
        <ChangePassword
          onClose={() => setActivePopup(null)}
          onSuccess={() => handleSuccess("Password changed successfully!")}
        />
      )}

      {/* Toast */}
      {showToast && (
        <Toast message={toastMessage} onClose={() => setShowToast(false)} />
      )}
    </div>
  );
}
