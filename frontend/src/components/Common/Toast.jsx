import React, { useEffect } from "react";
impor;
export default function Toast({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-10 right-10 z-100 w-80 overflow-hidden rounded-lg bg-white p-4 shadow-lg">
      <p className="font-medium text-green-600">{message}</p>

      {/* Progress line */}
      <div className="absolute bottom-0 left-0 h-1 w-full bg-gray-200">
        <div className="animate-progress h-full bg-green-500" />
      </div>
    </div>
  );
}
