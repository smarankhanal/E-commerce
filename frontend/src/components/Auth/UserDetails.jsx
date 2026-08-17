import UserDetailRow from "../Common/UserDetailRow";

export default function UserDetails({ onClose, user }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-3 text-2xl text-gray-500 hover:text-gray-800 cursor-pointer"
        >
          ×
        </button>
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-gray-900">
              User Details
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Your account information
            </p>
          </div>

          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            <div className="divide-y divide-gray-100">
              <UserDetailRow label="Full Name" value={user.fullName} />

              <UserDetailRow label="Username" value={user.userName} />

              <UserDetailRow label="Email" value={user.email} />

              <UserDetailRow label="Phone Number" value={user.phoneNumber} />

              <UserDetailRow
                label="Account Created"
                value={new Date(user.createdAt).toLocaleDateString()}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
