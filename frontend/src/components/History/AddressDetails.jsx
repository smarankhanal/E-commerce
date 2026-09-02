export default function AddressDetails({ shippingAddress, location }) {
  const hasLocation = location?.latitude != null && location?.longitude != null;

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3 border-b border-gray-100 pb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600">
          📍
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Shipping Address
          </h2>
          <p className="text-sm text-gray-500">Delivery information</p>
        </div>
      </div>

      {/* Address */}
      <div className="rounded-xl bg-gray-50 p-4">
        <p className="mb-1 text-sm font-medium text-gray-500">Address</p>

        <p className="text-base leading-relaxed text-gray-800">
          {shippingAddress || "No address provided"}
        </p>
      </div>

      {/* Location */}
      {hasLocation && (
        <div className="mt-4 rounded-xl border border-gray-100 p-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-medium text-gray-700">
              Delivery Location
            </p>

            <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-600">
              Location added
            </span>
          </div>

          <div className="mb-4 grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-gray-50 p-3">
              <p className="text-xs text-gray-500">Latitude</p>
              <p className="mt-1 text-sm font-medium text-gray-800">
                {location.latitude}
              </p>
            </div>

            <div className="rounded-lg bg-gray-50 p-3">
              <p className="text-xs text-gray-500">Longitude</p>
              <p className="mt-1 text-sm font-medium text-gray-800">
                {location.longitude}
              </p>
            </div>
          </div>

          <a
            href={`https://www.google.com/maps?q=${location.latitude},${location.longitude}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            <span>📍</span>
            View Delivery Location
          </a>
        </div>
      )}
    </div>
  );
}
