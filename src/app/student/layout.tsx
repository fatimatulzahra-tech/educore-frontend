"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute allowedRoles={["student"]}>
      <div className="min-h-screen flex bg-gray-100">

        {/* SIDEBAR */}
        <aside className="w-72 bg-black text-white p-6 flex flex-col">

          <h1 className="text-3xl font-bold mb-8 border-b border-gray-700 pb-4">
            Student Panel
          </h1>


          <nav className="flex flex-col gap-2">


            <Link
              href="/student/dashboard"
              className="px-4 py-3 rounded-lg hover:bg-gray-800 transition"
            >
              Dashboard
            </Link>


            <Link
              href="/student/attendance"
              className="px-4 py-3 rounded-lg hover:bg-gray-800 transition"
            >
              Attendance
            </Link>


            <Link
              href="/student/results"
              className="px-4 py-3 rounded-lg hover:bg-gray-800 transition"
            >
              Results
            </Link>


            <Link
              href="/student/fees"
              className="px-4 py-3 rounded-lg hover:bg-gray-800 transition"
            >
              Fees
            </Link>


          </nav>


          {/* LOGOUT */}
          <div className="mt-8">
            <LogoutButton />
          </div>


        </aside>



        {/* MAIN CONTENT */}
        <main className="flex-1 p-8 overflow-auto">
          {children}
        </main>


      </div>
    </ProtectedRoute>
  );
}