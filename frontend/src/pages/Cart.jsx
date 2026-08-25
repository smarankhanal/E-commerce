import { CartItem, CartSummary } from "../components";
import { FiShoppingBag } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Button } from "../components";
import { useNavigate } from "react-router-dom";
export default function Cart() {
  const navigate = useNavigate();
  const { items, totalQuantity, subTotal } = useSelector((state) => state.cart);

  return (
    <div className="max-w-7xl mx-auto px-6 mt-30">
      {items?.length === 0 ? (
        <div className="flex min-h-75 flex-col items-center justify-center rounded-2xl border border-gray-200 bg-gray-50/50 px-6 text-center">
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
            <FiShoppingBag className="h-7 w-7 text-gray-400" />
          </div>

          <h3 className="text-lg font-semibold text-gray-900">
            Your cart is empty
          </h3>

          <p className="mt-2 max-w-sm text-sm text-gray-500">
            Looks like you haven't added anything to your cart yet.
          </p>

          <Button
            text="Continue Shopping"
            onClick={() => navigate("/products")}
          />
        </div>
      ) : (
        <div className="mb-10 flex flex-col items-start justify-between gap-6 rounded-2xl border border-white/20 bg-blue-900/40 p-8 text-white shadow-2xl backdrop-blur-xl lg:flex-row">
          <div>
            <p className="text-sm font-medium uppercase text-white">
              Welcome back
            </p>

            <h1 className="mt-2 text-4xl font-bold">Your Shopping Cart</h1>

            <p className="mt-3 text-blue-600">
              You have{" "}
              <span className="font-bold text-white">{totalQuantity}</span>{" "}
              items waiting for checkout.
            </p>
          </div>

          <CartSummary subTotal={subTotal} />
        </div>
      )}
      {/* Cart Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items?.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
