import React from "react";
import { Input, ShippingAddress } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { FiMapPin, FiFileText, FiUser, FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { calculateCheckout } from "../store/slices/checkOutSlice";
import { useForm } from "react-hook-form";

export default function BillingDetailsForm() {
  const { user } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.cart);
  const { register, handleSubmit, setValue } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const proccedCheckout = async (data) => {
    await dispatch(
      calculateCheckout({
        products: items,
        shippingAddress: data?.shippingAddress,
        orderNotes: data?.orderNotes,
        location: data?.location,
      }),
    ).unwrap();
    navigate("/checkout");
  };
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
      {/* Header */}
      <form onSubmit={handleSubmit(proccedCheckout)}>
        <div className="mb-8 flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-700">
            <FiUser size={20} />
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900">Billing Details</h2>

            <p className="mt-1 text-sm text-gray-500">
              Enter your delivery information
            </p>
          </div>
        </div>

        {/* Personal Information */}
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">
            Personal Information
          </h3>

          <div type="submit" className="space-y-4">
            {/* Name */}
            <Input
              label="Full Name"
              placeholder="Enter name"
              type="text"
              value={user?.fullName || ""}
              className="cursor-not-allowed bg-gray-50 text-gray-500"
              disabled
            />

            {/* Phone */}
            <Input
              label="Phone Number"
              placeholder="Phone number"
              type="tel"
              value={user?.phoneNumber || ""}
              className="cursor-not-allowed bg-gray-50 text-gray-500"
              disabled
            />

            {/* Email */}
            <Input
              label="Email Address"
              placeholder="Email address"
              value={user?.email || ""}
              type="email"
              className="cursor-not-allowed bg-gray-50 text-gray-500"
              disabled
            />
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-gray-100" />

        {/* Delivery Address */}
        <ShippingAddress register={register} setValue={setValue} />

        {/* Divider */}
        <div className="my-8 border-t border-gray-100" />

        {/* Order Notes */}
        <div>
          <div className="mb-3 flex items-center gap-2">
            <FiFileText className="text-gray-500" size={18} />

            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
              Order Notes
            </h3>

            <span className="text-xs font-normal normal-case text-gray-400">
              (Optional)
            </span>
          </div>

          <textarea
            rows={5}
            placeholder="Notes about your order, e.g. special delivery instructions."
            className="w-full resize-none rounded-lg border border-gray-200 bg-white p-3 text-sm text-gray-700 outline-none transition-all placeholder:text-gray-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            {...register("orderNotes")}
          />
        </div>
        <div className="flex justify-center items-center mt-8 border-t border-gray-100 pt-6">
          <button
            type="submit"
            className="flex w-fit cursor-pointer items-center justify-center gap-2 rounded-xl bg-blue-900 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-blue-800 hover:shadow-md active:scale-[0.98]"
          >
            Proceed
            <FiArrowRight size={18} />
          </button>
        </div>
      </form>
    </div>
  );
}
