"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";

export default function AccountantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute allowedRoles={["accountant"]}>
      <div className="min-h-screen flex bg-gray-100">

        <aside className="w-72 bg-black text-white p-6 flex flex-col">

          <h1 className="text-3xl font-bold mb-8 border-b border-gray-700 pb-4">
            Accountant Panel
          </h1>

          <nav className="flex flex-col gap-2">

            <Link
              href="/accountant/dashboard"
              className="px-4 py-3 rounded-lg hover:bg-gray-800"
            >
              Dashboard
            </Link>

            <Link
              href="/accountant/fees"
              className="px-4 py-3 rounded-lg hover:bg-gray-800"
            >
              Fees
            </Link>

            <Link
              href="/accountant/payments"
              className="px-4 py-3 rounded-lg hover:bg-gray-800"
            >
              Payments
            </Link>

          </nav>

          <div className="mt-8">
            <LogoutButton />
          </div>

        </aside>


        <main className="flex-1 p-8 overflow-auto">
          {children}
        </main>

      </div>
    </ProtectedRoute>
  );
}