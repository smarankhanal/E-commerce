import React from "react";
import Input from "../../components/Common/Input";
import Button from "../../components/Common/Button";
import ResetPasswordForm from "../../components/Auth/ResetPasswordForm";

export default function ResetPassword() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <ResetPasswordForm />
      </div>
    </div>
  );
}
