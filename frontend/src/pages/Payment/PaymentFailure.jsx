import { useNavigate } from "react-router-dom";

export default function PaymentFailure() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-red-600">Payment Failed</h1>

        <p className="mt-3 text-gray-600">
          Your eSewa payment was not completed.
        </p>

        <button
          onClick={() => navigate("/checkout")}
          className="mt-6 rounded-lg bg-gray-900 px-6 py-3 text-white"
        >
          Return to Checkout
        </button>
      </div>
    </div>
  );
}
