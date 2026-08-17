import React from "react";
import Input from "../Common/Input";
import Button from "../Common/Button";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
export default function UpdateAccountDetails({ user, onClose }) {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      fullName: user?.fullName || "",
      userName: user?.userName || "",
      email: user?.email || "",
      phoneNumber: user?.phoneNumber || "",
    },
  });
  const submit = async () => {
    try {
    } catch (error) {
      console.error("Error during registration", error);
    }
  };
  return (
    <div className="inset-0 fixed z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-md rounded-lg shadow-xl bg-white p-6">
        <button
          className="absolute right-3 top-4 text-2xl cursor-pointer text-gray-500 hover:text-gray-800"
          type="submit"
          onClick={onClose}
        >
          ×
        </button>

        <div className="space-y-6">
          {/* Heading */}
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-gray-900">
              Update Account Details
            </h1>
          </div>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit(submit)}>
            <Input
              label="Userame"
              type="text"
              placeholder="Enter username"
              {...register("userName", { required: true })}
            />
            <Input
              label="Fullname"
              type="text"
              placeholder="Enter fullname"
              {...register("fullName", { required: true })}
            />
            <Input
              label="Email"
              type="text"
              placeholder="Enter email"
              {...register("email", { required: true })}
            />
            <Input
              label="Phone Number"
              type="text"
              placeholder="Enter phone number"
              {...register("phoneNumber", { required: true })}
            />
            <Button text="Update" type="submit" />
          </form>
        </div>
      </div>
    </div>
  );
}
