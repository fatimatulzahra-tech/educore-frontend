"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useRouter } from "next/navigation";
interface School {
  id: number;
  name: string;
  slug: string;
  email: string;
  phone: string;
  address: string;
  principal_id?: number | null;
}

export default function SchoolsPage() {
  const [schools, setSchools] = useState<School[]>([]);

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [address, setAddress] = useState("");

  const [phone, setPhone] = useState("");

  const [slug, setSlug] = useState("");

  const [loading, setLoading] = useState(false);

  const [fetching, setFetching] = useState(true);

  const router = useRouter();

  // -----------------------
  // FETCH SCHOOLS
  // -----------------------

  const fetchSchools = async () => {
    try {
      const response = await api.get("/platform/schools");

      setSchools(response.data);
      console.log(response.data);
    } catch (error) {
      console.log("Failed to fetch schools");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchSchools();
  }, []);

  // -----------------------
  // CREATE SCHOOL
  // -----------------------

  const createSchool = async () => {
    if (!name || !email || !slug || !phone) {
      alert("All fields are required");

      return;
    }

    try {
      setLoading(true);

      await api.post("/platform/schools", {
        name: name.trim(),
        slug: slug.trim(),
        email: email.trim(),
        phone: phone.trim(),
        address: address.trim(),
      });

      alert("School Created Successfully");

      // RESET FORM

      setName("");
      setEmail("");
      setAddress("");
      setPhone("");
      setSlug("");

      // REFRESH LIST

      fetchSchools();
    } catch (error: any) {
      console.log(error.response?.data);

      alert(error?.response?.data?.message || "Failed to create school");
    } finally {
      setLoading(false);
    }
  };
  // -----------------------
  // DEACTIVATE SCHOOL
  // -----------------------

  const deactivateSchool = async (schoolId: number) => {
    const confirmed = window.confirm("Deactivate this school?");

    if (!confirmed) return;

    try {
      await api.patch(`/schools/${schoolId}/deactivate`);

      alert("School deactivated successfully");

      fetchSchools();
    } catch (error) {
      console.log(error);

      alert("Failed to deactivate school");
    }
  };
  return (
    <ProtectedRoute allowedRoles={["platform_admin"]}>
      <div className="p-8">
        {/* HEADER */}

        <div className="mb-10">
          <h1 className="text-4xl font-bold">Schools Management</h1>

          <p className="text-gray-500 mt-2">
            Manage all tenant schools from one platform
          </p>
        </div>

        {/* CREATE SCHOOL */}

        <div className="bg-white border rounded-xl p-6 mb-10 max-w-2xl">
          <h2 className="text-2xl font-semibold mb-5">Create New School</h2>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="School Name"
              className="border p-3 w-full rounded"
              value={name}
              onChange={(e) => {
                setName(e.target.value);

                setSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"));
              }}
            />

            <input
              type="text"
              placeholder="School Slug"
              className="border p-3 w-full rounded"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
            />

            <input
              type="email"
              placeholder="School Email"
              className="border p-3 w-full rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="text"
              placeholder="Phone Number"
              className="border p-3 w-full rounded"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <input
              type="text"
              placeholder="Address"
              className="border p-3 w-full rounded"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <button
              onClick={createSchool}
              disabled={loading}
              className="bg-black text-white px-5 py-3 rounded w-full"
            >
              {loading ? "Creating School..." : "Create School"}
            </button>
          </div>
        </div>

        {/* SCHOOLS LIST */}

        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold">All Schools</h2>

            <div className="text-gray-500">Total Schools: {schools.length}</div>
          </div>

          {fetching ? (
            <p>Loading schools...</p>
          ) : schools.length === 0 ? (
            <div className="bg-white border rounded-xl p-10 text-center text-gray-500">
              No schools created yet
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {schools.map((school) => (
                <div
                  key={school.id}
                  className="bg-white border rounded-xl p-6 shadow-sm"
                >
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold">{school.name}</h3>

                    <p className="text-gray-500">{school.slug}</p>
                  </div>

                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="font-semibold">Email:</span>{" "}
                      {school.email}
                    </p>

                    <p>
                      <span className="font-semibold">Phone:</span>{" "}
                      {school.phone}
                    </p>

                    <p>
                      <span className="font-semibold">Address:</span>{" "}
                      {school.address}
                    </p>

                    <p>
                      <span className="font-semibold">Principal:</span>{" "}
                      {school.principal_id ? "Assigned" : "Not Assigned"}
                    </p>
                  </div>

                  {/* ACTIONS */}

                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={() =>
                        router.push(
                          `/platform/principals?schoolId=${school.id}`,
                        )
                      }
                      className="
    bg-blue-600
    text-white
    px-4
    py-2
    rounded
    w-full
    hover:bg-blue-700
    transition-colors
    duration-200
  "
                    >
                      Invite Principal
                    </button>
                    <button
                      onClick={() => deactivateSchool(school.id)}
                      className="
    bg-red-500
    text-white
    px-4
    py-2
    rounded
    w-full
    hover:bg-red-600
  "
                    >
                      Deactivate School
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
