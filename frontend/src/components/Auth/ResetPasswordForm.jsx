import React, { useState } from "react";
import PasswordInput from "./PasswordInput";
import Button from "../Common/Button";
import Toast from "../Common/Toast";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../store/slices/authSlice";
import InputError from "../Common/InputError";
import { useNavigate } from "react-router-dom";

export default function ResetPasswordForm() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { status, fieldErrors, resetToken } = useSelector(
    (state) => state.auth,
  );

  const submit = async (data) => {
    try {
      await dispatch(
        resetPassword({
          newPassword: data.newPassword,
          resetToken,
        }),
      ).unwrap();
      navigate("/login", {
        state: {
          toast: "Password reset successfully",
        },
      });
    } catch (error) {
      console.error("Password reset failed:", error);
    }
  };

  return (
    <>
      <div className="space-y-6">
        {/* Heading */}

        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900">
            Reset Password
          </h1>
        </div>

        {/* Form */}

        <form className="space-y-4" onSubmit={handleSubmit(submit)}>
          <PasswordInput
            label="New Password"
            placeholder="New Password"
            {...register("newPassword", {
              required: "Password is required",
            })}
          />

          <InputError msg={fieldErrors?.newPassword} />

          <div className="flex items-center justify-between">
            <Button
              text={status === "loading" ? "Resetting..." : "Reset Password"}
              type="submit"
              disabled={status === "loading"}
            />
          </div>
        </form>
      </div>
    </>
  );
}
