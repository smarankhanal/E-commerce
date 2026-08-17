import React, { useState } from "react";
import PasswordInput from "./PasswordInput";
import Button from "../Common/Button";
import { useDispatch, useSelector } from "react-redux";
import InputError from "../Common/InputError";
import { changePassword } from "../../store/slices/authSlice";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Toast from "../Common/Toast";

export default function ChangePassword({ onClose, onSuccess }) {
  const { register, handleSubmit, reset } = useForm();
  const { fieldErrors, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(true);

  const submit = async (data) => {
    try {
      await dispatch(changePassword(data)).unwrap();
      reset();
      onSuccess();
    } catch (error) {
      console.error("Password change failure");
    }
  };
  return (
    <>
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
            {/* Heading */}
            <div className="text-center">
              <h1 className="text-2xl font-semibold text-gray-900">
                Change Password
              </h1>
            </div>

            {/* Form */}
            <form className="space-y-4" onSubmit={handleSubmit(submit)}>
              <PasswordInput
                label="Old Password"
                placeholder="Old Password"
                {...register("oldPassword", {
                  required: true,
                })}
              />

              <PasswordInput
                label="New Password"
                placeholder="New Password"
                {...register("newPassword", {
                  required: true,
                })}
              />
              {fieldErrors["newPassword"] && (
                <InputError msg={fieldErrors["newPassword"]} />
              )}

              <div className="flex items-center justify-between">
                <Button text="Change Password" type="submit" />
              </div>
              {error && <InputError msg={error} />}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
