"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useRouter } from "next/navigation";

import api from "@/services/api";

export default function ResetPasswordPage() {
  const params = useSearchParams();

  const router = useRouter();

  const token =
    params.get("token");

  const [password, setPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const handleReset = async () => {
    try {
      if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      await api.post(
        "/auth/reset-password",
        {
          reset_token: token,
          new_password: password
        }
      );

      alert(
        "Password reset successful"
      );

      router.push("/login");

    } catch (error) {
      console.log(error);
      alert("Failed");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">

      <div className="w-[400px] border p-6 rounded">

        <h1 className="text-xl font-bold mb-4">
          Reset Password
        </h1>

        <input
          type="password"
          placeholder="New Password"
          className="w-full border p-2 mb-3"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full border p-2 mb-3"
          value={confirmPassword}
          onChange={(e) =>
            setConfirmPassword(e.target.value)
          }
        />

        <button
          onClick={handleReset}
          className="bg-black text-white w-full py-2"
        >
          Reset Password
        </button>

      </div>

    </div>
  );
}