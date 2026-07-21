"use client";

import Link from "next/link";

import {
  useRouter,
  usePathname,
} from "next/navigation";

import LogoutButton from "@/components/LogoutButton";

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const pathname = usePathname();

  const logout = () => {
    localStorage.clear();

    router.push("/login");
  };

  const navLinkClass = (path: string) =>
    `block px-4 py-2 rounded-lg transition-all duration-200 ${
      pathname === path
        ? "bg-white text-black font-semibold shadow"
        : "text-white hover:bg-gray-800 hover:text-white"
    }`;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* SIDEBAR */}

      <aside className="w-64 bg-black text-white p-6 flex flex-col">
        <div>
          <h1 className="text-3xl font-bold mb-10">
            EduCore
          </h1>

          <nav className="space-y-2">
            <Link
              href="/platform/dashboard"
              className={navLinkClass(
                "/platform/dashboard"
              )}
            >
              Dashboard
            </Link>

            <Link
              href="/platform/schools"
              className={navLinkClass(
                "/platform/schools"
              )}
            >
              Schools
            </Link>

            <Link
              href="/platform/principals"
              className={navLinkClass(
                "/platform/principals"
              )}
            >
              Principals
            </Link>

            <Link
              href="/platform/analytics"
              className={navLinkClass(
                "/platform/analytics"
              )}
            >
              Analytics
            </Link>
          </nav>
        </div>

        {/* LOGOUT */}

        <div className="mt-12">
          <LogoutButton />
        </div>
      </aside>

      {/* MAIN */}

      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}