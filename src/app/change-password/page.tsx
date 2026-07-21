"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import api from "@/services/api";

import { getAuth } from "@/lib/auth";

export default function ChangePasswordPage() {

  const router = useRouter();

  

  const [newPassword, setNewPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
  if (newPassword !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  try {
    setLoading(true);

    await api.post(
      "/auth/change-password",
      {
        new_password: newPassword,
      }
    );

    alert("Password updated successfully");

    const auth = getAuth();
    const role = auth?.role;

    switch (role) {
      case "platform_admin":
        router.push("/platform/dashboard");
        break;

      case "principal":
        router.push("/principal/dashboard");
        break;

      case "teacher":
        router.push("/teacher/dashboard");
        break;

      case "student":
        router.push("/student/dashboard");
        break;

      case "accountant":
        router.push("/accountant/dashboard");
        break;

      case "parent":
        router.push("/parent/dashboard");
        break;

      default:
        router.push("/");
    }
  } catch (error) {
    console.error(error);
    alert("Password change failed");
  } finally {
    setLoading(false);
  }
};

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">

        <h1 className="text-3xl font-bold mb-6">

          Change Password

        </h1>

        <p className="text-gray-500 mb-6">

          You must change your temporary password before continuing.

        </p>

        

        <input

          type="password"

          placeholder="New Password"

          className="w-full border rounded-lg p-3 mb-4"

          value={newPassword}

          onChange={(e) =>

            setNewPassword(e.target.value)

          }

        />

        <input

          type="password"

          placeholder="Confirm New Password"

          className="w-full border rounded-lg p-3 mb-6"

          value={confirmPassword}

          onChange={(e) =>

            setConfirmPassword(e.target.value)

          }

        />

        <button

          onClick={handleSubmit}

          disabled={loading}

          className="w-full bg-black text-white rounded-lg p-3"

        >

          {

            loading

              ? "Updating..."

              : "Update Password"

          }

        </button>

      </div>

    </div>

  );

}