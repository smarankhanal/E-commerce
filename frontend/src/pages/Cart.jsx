import { CartItem, CartSummary, Button } from "../components";
import { FiShoppingBag, FiTrash2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../store/slices/cartSlice";

export default function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { items, totalQuantity, subTotal } = useSelector((state) => state.cart);

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="mx-auto mt-30 max-w-7xl px-6">
      {items?.length === 0 ? (
        /* Empty Cart */
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
        <>
          {/* Cart Header */}
          <div className="mb-10 flex flex-col items-start justify-between gap-6 rounded-2xl border border-white/20 bg-blue-900/40 p-8 text-white shadow-2xl backdrop-blur-xl lg:flex-row">
            {/* Left Side */}
            <div className="flex-1">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium uppercase text-white">
                    Welcome back
                  </p>

                  <h1 className="mt-2 text-4xl font-bold">
                    Your Shopping Cart
                  </h1>

                  <p className="mt-3 text-blue-600">
                    You have{" "}
                    <span className="font-bold text-white">
                      {totalQuantity}
                    </span>{" "}
                    items waiting for checkout.
                  </p>
                </div>

                {/* Clear Cart Button */}
                <button
                  type="button"
                  onClick={handleClearCart}
                  className=" cursor-pointer flex shrink-0 items-center gap-2 rounded-lg border border-red-300/40 bg-red-700 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-red-500/60  hover:text-white  hover:scale-105"
                >
                  <FiTrash2 size={16} />
                  Clear Cart
                </button>
              </div>
            </div>

            {/* Cart Summary */}
            <CartSummary subTotal={subTotal} />
          </div>

          {/* Cart Items */}
          <div className="mb-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {items?.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
