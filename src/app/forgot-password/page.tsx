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
    <div className="
      min-h-screen
      w-full
      flex
      items-center
      justify-center
      px-4
    ">

      <div className="
        w-full
        max-w-[400px]
        border
        p-6
        sm:p-8
        rounded
        bg-white
      ">

        <h1 className="
          text-xl
          font-bold
          mb-4
        ">
          Forgot Password
        </h1>


        <input
          type="email"
          placeholder="Email"
          className="
            w-full
            border
            p-2
            mb-4
            rounded
          "
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />


        <button
          onClick={handleSubmit}
          className="
            bg-black
            text-white
            w-full
            py-2
            rounded
          "
        >
          Send Reset Link
        </button>


      </div>

    </div>
  );
}