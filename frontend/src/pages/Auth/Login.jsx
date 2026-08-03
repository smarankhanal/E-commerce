import React from "react";
import { LoginForm } from "../../components";

export default function Login() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <LoginForm />
      </div>
    </div>
  );
}
