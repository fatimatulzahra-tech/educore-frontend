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
      <div className="
        min-h-screen
        w-full
        overflow-x-hidden
        flex
        flex-col
        md:flex-row
        bg-gray-100
      ">


        {/* SIDEBAR */}
        <aside className="
          w-full
          md:w-72
          shrink-0
          bg-black
          text-white
          p-4
          md:p-6
          flex
          flex-col
          justify-between
        ">


          <div>

            <h1 className="
              text-2xl
              md:text-3xl
              font-bold
              mb-6
              md:mb-8
              border-b
              border-gray-700
              pb-4
            ">
              Accountant Panel
            </h1>


            <nav className="
              flex
              flex-row
              md:flex-col
              gap-2
              overflow-x-auto
              md:overflow-visible
              pb-2
              md:pb-0
            ">


              <Link
                href="/accountant/dashboard"
                className="
                  px-4
                  py-3
                  rounded-lg
                  hover:bg-gray-800
                  whitespace-nowrap
                "
              >
                Dashboard
              </Link>


              <Link
                href="/accountant/fees"
                className="
                  px-4
                  py-3
                  rounded-lg
                  hover:bg-gray-800
                  whitespace-nowrap
                "
              >
                Fees
              </Link>


              <Link
                href="/accountant/payments"
                className="
                  px-4
                  py-3
                  rounded-lg
                  hover:bg-gray-800
                  whitespace-nowrap
                "
              >
                Payments
              </Link>


            </nav>

          </div>



          <div className="mt-6 md:mt-8">
            <LogoutButton />
          </div>


        </aside>



        {/* MAIN CONTENT */}
        <main className="
          flex-1
          w-full
          p-4
          md:p-8
          overflow-x-auto
        ">
          {children}
        </main>


      </div>
    </ProtectedRoute>
  );
}