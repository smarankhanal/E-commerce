import React from "react";
import { SignupForm } from "../../components";

export default function SignUp() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 mt-20">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <SignupForm />
      </div>
    </div>
  );
}
