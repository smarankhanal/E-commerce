import React from "react";
import { FiUser, FiMail, FiPhone, FiMapPin, FiFileText } from "react-icons/fi";
import { useSelector } from "react-redux";

export default function BillingDetails({ checkoutDetails }) {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">Billing Details</h2>

        <p className="mt-1 text-sm text-gray-500">
          Your delivery and contact information
        </p>
      </div>

      <div className="space-y-5">
        {/* Name */}
        <div className="flex items-start gap-3">
          <FiUser className="mt-1 text-gray-500" size={18} />

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Name
            </p>
            <p className="mt-1 text-sm font-medium text-gray-800">
              {user.fullName}
            </p>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-start gap-3">
          <FiMail className="mt-1 text-gray-500" size={18} />

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Email
            </p>
            <p className="mt-1 text-sm font-medium text-gray-800">
              {user.email}
            </p>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-start gap-3">
          <FiPhone className="mt-1 text-gray-500" size={18} />

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Phone Number
            </p>
            <p className="mt-1 text-sm font-medium text-gray-800">
              {user.phoneNumber}
            </p>
          </div>
        </div>

        {/* Address */}
        <div className="flex items-start gap-3">
          <FiMapPin className="mt-1 text-gray-500" size={18} />

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Address
            </p>
            <p className="mt-1 text-sm font-medium text-gray-800">
              {checkoutDetails?.shippingAddress}
            </p>
          </div>
        </div>

        {/* Notes - only show if included */}
        {checkoutDetails?.orderNotes.trim() && (
          <div className="border-t border-gray-100 pt-5">
            <div className="flex items-start gap-3">
              <FiFileText className="mt-1 text-gray-500" size={18} />

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  Order Notes
                </p>

                <p className="mt-1 text-sm text-gray-700">
                  {checkoutDetails?.orderNotes}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
