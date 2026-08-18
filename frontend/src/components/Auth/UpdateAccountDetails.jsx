import React from "react";
import Input from "../Common/Input";
import Button from "../Common/Button";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateAccountDetails } from "../../store/slices/authSlice";
import InputError from "../Common/InputError";
export default function UpdateAccountDetails({ user, onClose, onSuccess }) {
  const dispatch = useDispatch();
  const { fieldErrors, status, error } = useSelector((state) => state.auth);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      fullName: user?.fullName || "",
      userName: user?.userName || "",
      email: user?.email || "",
      phoneNumber: user?.phoneNumber || "",
    },
  });
  const submit = async (data) => {
    try {
      await dispatch(updateAccountDetails(data)).unwrap();
      onSuccess();
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
              label="Username"
              type="text"
              placeholder="Enter username"
              {...register("userName", { required: true })}
            />
            {fieldErrors["userName"] && (
              <InputError msg={fieldErrors["userName"]} />
            )}
            <Input
              label="Fullname"
              type="text"
              placeholder="Enter fullname"
              {...register("fullName", { required: true })}
            />
            {fieldErrors["fullName"] && (
              <InputError msg={fieldErrors["fullName"]} />
            )}
            <Input
              label="Email"
              type="text"
              placeholder="Enter email"
              {...register("email", { required: true })}
            />
            {fieldErrors["email"] && <InputError msg={fieldErrors["email"]} />}
            <Input
              label="Phone Number"
              type="text"
              placeholder="Enter phone number"
              {...register("phoneNumber", { required: true })}
            />
            {fieldErrors["phoneNumber"] && (
              <InputError msg={fieldErrors["phoneNumber"]} />
            )}
            {!fieldErrors && error && <InputError msg={error} />}

            <Button
              text={status === "loading" ? "Updating..." : "Update"}
              type="submit"
              disabled={status === "loading"}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
