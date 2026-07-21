"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";

export default function PrincipalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute allowedRoles={["principal"]}>
      <div className="min-h-screen flex bg-gray-100">
        {/* SIDEBAR */}
        <aside className="w-72 bg-black text-white p-6 flex flex-col">
          <h1 className="text-3xl font-bold mb-8 border-b border-gray-700 pb-4">
            Principal Panel
          </h1>

          <nav className="flex flex-col gap-2">
            <Link
              href="/principal/dashboard"
              className="px-4 py-3 rounded-lg hover:bg-gray-800 transition"
            >
              Dashboard
            </Link>

            <Link
              href="/principal/classes"
              className="px-4 py-3 rounded-lg hover:bg-gray-800 transition"
            >
              Classes
            </Link>

            <Link
              href="/principal/teachers"
              className="px-4 py-3 rounded-lg hover:bg-gray-800 transition"
            >
              Teachers
            </Link>

            <Link
              href="/principal/teacher-assignments"
              className="px-4 py-3 rounded-lg hover:bg-gray-800 transition"
            >
              Teacher Assignments
            </Link>

            <Link
              href="/principal/students"
              className="px-4 py-3 rounded-lg hover:bg-gray-800 transition"
            >
              Students
            </Link>

            <Link
              href="/principal/attendance"
              className="px-4 py-3 rounded-lg hover:bg-gray-800 transition"
            >
              Attendance
            </Link>

            <Link
              href="/principal/exams"
              className="px-4 py-3 rounded-lg hover:bg-gray-800 transition"
            >
              Exams
            </Link>

            <Link
              href="/principal/accountants"
              className="px-4 py-3 rounded-lg hover:bg-gray-800 transition"
            >
              Accountants
            </Link>

            <Link
              href="/principal/fees"
              className="px-4 py-3 rounded-lg hover:bg-gray-800 transition"
            >
              Fees
            </Link>

            <Link
              href="/principal/academics"
              className="px-4 py-3 rounded-lg hover:bg-gray-800 transition"
            >
              Academics
            </Link>
          </nav>

          {/* PUSH LOGOUT TO BOTTOM */}
          <div className="mt-8">
            <LogoutButton />
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 p-8 overflow-auto">{children}</main>
      </div>
    </ProtectedRoute>
  );
}
