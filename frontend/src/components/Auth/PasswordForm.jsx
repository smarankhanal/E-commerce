import React from "react";
import Input from "../Common/Input";
import Button from "../Common/Button";
import PasswordInput from "./PasswordInput";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../store/slices/authSlice";
import InputError from "../Common/InputError";
import { useNavigate } from "react-router-dom";
export default function PasswordForm() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, status } = useSelector((state) => state.auth);
  const submit = async (data) => {
    try {
      await dispatch(forgotPassword(data)).unwrap();
      navigate("/verify-otp", {
        state: {
          email: data.email,
          purpose: "forgot-password",
        },
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="space-y-6">
      {/* Heading */}
      <div className="text-center">
        <h1 className="text-2xl font-semibold  text-gray-900">
          Forgot Password
        </h1>
      </div>

      {/* Form */}
      <form className="space-y-4" onSubmit={handleSubmit(submit)}>
        <Input
          label="Username"
          type="text"
          placeholder="Enter your username"
          {...register("userName", { required: true })}
        />
        <Input
          label="Email"
          type="text"
          placeholder="Enter your email"
          {...register("email", { required: true })}
        />

        <InputError msg={error} />
        <div className="flex justify-between items-center">
          <Button
            text={status === "loading" ? "Submitting..." : "Submit"}
            type="submit"
            disabled={status === "loading"}
          />
        </div>
      </form>
    </div>
  );
}
