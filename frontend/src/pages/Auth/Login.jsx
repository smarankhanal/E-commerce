import React, { useRef, useState, useEffect } from "react";
import { LoginForm, Toast } from "../../components";
import { useLocation, useNavigate } from "react-router-dom";
export default function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    const message = location.state?.toast;

    if (!message) return;

    setToastMessage(message);
    setShowToast(true);

    navigate(location.pathname, {
      replace: true,
      state: null,
    });
  }, [location, navigate]);
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <LoginForm />
      </div>
      {showToast && (
        <Toast message={toastMessage} onClose={() => setShowToast(false)} />
      )}
    </div>
  );
}
