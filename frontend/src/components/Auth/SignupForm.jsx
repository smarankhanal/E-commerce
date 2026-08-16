import React from "react";
import Input from "../Common/Input";
import Button from "../Common/Button";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../store/slices/registerSlice";
import InputError from "../Common/InputError";
import PasswordInput from "./PasswordInput";

export default function SignupForm() {
  const { register, handleSubmit } = useForm();
  const { fieldErrors } = useSelector((state) => state.register);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signUp = async (data) => {
    try {
      await dispatch(registerUser(data)).unwrap();

      navigate("/verify-otp", {
        state: {
          email: data.email,
          purpose: "registration",
        },
      });
    } catch (error) {
      console.error("Registration failed:");
    }
  };
  return (
    <div className="space-y-6">
      {/* Heading */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">Create Account</h1>
      </div>

      {/* Form */}
      <form className="space-y-4" onSubmit={handleSubmit(signUp)}>
        <div className="flex gap-2">
          <div>
            <Input
              label="Username"
              type="text"
              placeholder="Enter username"
              {...register("userName", {
                required: true,
              })}
            />
            {fieldErrors["userName"] && (
              <InputError msg={fieldErrors["userName"]} />
            )}
          </div>
          <div>
            <Input
              label="Full Name"
              type="text"
              placeholder="Enter your full name"
              {...register("fullName", {
                required: true,
              })}
            />
            {fieldErrors["fullName"] && (
              <InputError msg={fieldErrors["fullName"]} />
            )}
          </div>
        </div>
        <Input
          label="Email"
          type="email"
          placeholder="Enter your email"
          {...register("email", {
            required: true,
          })}
        />
        {fieldErrors["email"] && <InputError msg={fieldErrors["email"]} />}
        <PasswordInput
          label="Password"
          placeholder="Create a password"
          {...register("password", {
            required: true,
          })}
        />
        {fieldErrors["password"] && (
          <InputError msg={fieldErrors["password"]} />
        )}
        <Input
          label="Phone Number"
          type="number"
          placeholder="98XXXXXXXX"
          {...register("phoneNumber", {
            required: true,
          })}
        />
        {fieldErrors["phoneNumber"] && (
          <InputError msg={fieldErrors["phoneNumber"]} />
        )}
        <Button text="Sign Up" type="submit" />
      </form>

      {/* Footer */}
      <p className="text-center text-sm text-gray-600">
        Already have an account?
        <span
          className="cursor-pointer font-semibold text-blue-600 hover:underline"
          onClick={() => navigate("/login")}
        >
          Login
        </span>
      </p>
    </div>
  );
}
