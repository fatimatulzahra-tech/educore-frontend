"use client";

import { useState } from "react";
import api from "@/services/api";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    try {
      await api.post(
        "/auth/forgot-password",
        {
          email
        }
      );

      alert(
        "If account exists, reset link sent"
      );

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-[400px] border p-6 rounded">

        <h1 className="text-xl font-bold mb-4">
          Forgot Password
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 mb-4"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <button
          onClick={handleSubmit}
          className="bg-black text-white w-full py-2"
        >
          Send Reset Link
        </button>

      </div>
    </div>
  );
}