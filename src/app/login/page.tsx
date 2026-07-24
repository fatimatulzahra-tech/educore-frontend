"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/services/api";
import { saveAuth } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);

      const response = await api.post("/auth/login", {
        email,
        password,
      });

      const data = response.data;

      // -------------------------
      // VALIDATE RESPONSE
      // -------------------------

      if (!data?.access_token || !data?.role) {
        throw new Error("Invalid login response");
      }

      // -------------------------
      // SAVE AUTH
      // -------------------------

      saveAuth(data.access_token, {
        role: data.role,
        user_id: data.user_id,
        school_id: data.school_id,
      });

      // -------------------------
      // STORE TOKEN & ROLE
      // -------------------------

      localStorage.setItem("token", data.access_token);
      localStorage.setItem("role", data.role);

      // -------------------------
      // FORCE PASSWORD CHANGE
      // -------------------------

      if (data.require_password_change) {
        router.push("/change-password");
        return;
      }

      // -------------------------
      // ROLE BASED REDIRECT
      // -------------------------

      if (data.role === "principal") {
        router.push("/principal/dashboard");
        return;
      }

      if (data.role === "teacher") {
        router.push("/teacher/dashboard");
        return;
      }

      if (data.role === "student") {
        router.push("/student/dashboard");
        return;
      }

      if (data.role === "accountant") {
        router.push("/accountant/dashboard");
        return;
      }

      if (data.role === "platform_admin") {
        router.push("/platform/dashboard");
        return;
      }

      if (data.role === "parent") {
        router.push("/parent/dashboard");
        return;
      }

      router.push("/");
    } catch (error) {
      console.log("Login error:", error);
      alert("Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="
      min-h-screen
      w-full
      flex
      items-center
      justify-center
      bg-gray-50
      px-4
    ">

      <div className="
        w-full
        max-w-[400px]
        border
        p-6
        sm:p-8
        rounded-lg
        bg-white
        shadow
      ">

        <h1 className="
          text-2xl
          font-bold
          mb-5
        ">
          Login
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
          onChange={(e) => setEmail(e.target.value)}
        />


        <input
          type="password"
          placeholder="Password"
          className="
            w-full
            border
            p-2
            mb-4
            rounded
          "
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />


        <button
          onClick={handleLogin}
          disabled={loading}
          className="
            bg-black
            text-white
            px-4
            py-2
            rounded
            w-full
          "
        >
          {loading ? "Logging in..." : "Login"}
        </button>


      </div>

    </div>
  );
}