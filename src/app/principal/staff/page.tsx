"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";

export default function StaffPage() {
  const [staff, setStaff] = useState<any[]>([]);

  const [editingId, setEditingId] = useState<number | null>(null);

  const [firstName, setFirstName] = useState("");

  const [lastName, setLastName] = useState("");

  const [email, setEmail] = useState("");

  const [phone, setPhone] = useState("");

  const [designation, setDesignation] = useState("");

  const [department, setDepartment] = useState("");

  const [qualification, setQualification] = useState("");

  const [experience, setExperience] = useState("");

  const [salary, setSalary] = useState("");

  const [joiningDate, setJoiningDate] = useState("");

  const [employmentType, setEmploymentType] = useState("");

  const [address, setAddress] = useState("");

  const [status, setStatus] = useState("Active");

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const res = await api.get("/staff");

      setStaff(res.data || []);
    } catch (err) {
      console.log(err);

      setStaff([]);
    }
  };

  const saveStaff = async () => {
    try {
      const payload = {
        first_name: firstName,

        last_name: lastName,

        email,

        phone,

        designation,

        department,

        qualification,

        experience,

        salary,

        joining_date: joiningDate,

        employment_type: employmentType,

        address,

        status,
      };

      if (editingId) {
        await api.put(`/staff/${editingId}`, payload);

        alert("Staff updated");
      } else {
        await api.post("/staff", payload);

        alert("Staff created");
      }

      resetForm();

      fetchStaff();
    } catch (err) {
      console.log(err);

      alert("Operation failed");
    }
  };

  const resetForm = () => {
    setEditingId(null);

    setFirstName("");

    setLastName("");

    setEmail("");

    setPhone("");

    setDesignation("");

    setDepartment("");

    setQualification("");

    setExperience("");

    setSalary("");

    setJoiningDate("");

    setEmploymentType("");

    setAddress("");

    setStatus("Active");
  };

  const deleteStaff = async (id: number) => {
    if (!confirm("Delete this staff member?")) return;

    try {
      await api.delete(`/staff/${id}`);

      fetchStaff();
    } catch (err) {
      console.log(err);

      alert("Delete failed");
    }
  };

  const resetPassword = async (userId: number) => {
    try {
      const res = await api.post("/auth/admin-reset-password", {
        user_id: userId,
      });

      alert(`Temporary password: ${res.data.temporary_password}`);
    } catch (err) {
      console.log(err);

      alert("Reset failed");
    }
  };
  return (
    <div className="p-4 md:p-8">
      {/* FORM */}
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">
        Staff Management
      </h1>

      <div
        className="
bg-white
rounded-xl
shadow
p-4
md:p-6
mb-8
space-y-3
"
      >
        <input
          className="
border
p-2
rounded
w-full
"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <input
          className="
border
p-2
rounded
w-full
"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <input
          className="
border
p-2
rounded
w-full
"
          placeholder="Email"
          value={email}
          disabled={editingId !== null}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="
border
p-2
rounded
w-full
"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          className="
border
p-2
rounded
w-full
"
          placeholder="Designation / Post"
          value={designation}
          onChange={(e) => setDesignation(e.target.value)}
        />

        <input
          className="
border
p-2
rounded
w-full
"
          placeholder="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />

        <input
          className="
border
p-2
rounded
w-full
"
          placeholder="Qualification"
          value={qualification}
          onChange={(e) => setQualification(e.target.value)}
        />

        <input
          className="
border
p-2
rounded
w-full
"
          placeholder="Experience (Years)"
          type="number"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
        />

        <input
          className="
border
p-2
rounded
w-full
"
          placeholder="Salary"
          type="number"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
        />

        <input
          className="
border
p-2
rounded
w-full
"
          type="date"
          value={joiningDate}
          onChange={(e) => setJoiningDate(e.target.value)}
        />

        <select
          className="
border
p-2
rounded
w-full
"
          value={employmentType}
          onChange={(e) => setEmploymentType(e.target.value)}
        >
          <option value="">Select Employment Type</option>

          <option value="Permanent">Permanent</option>

          <option value="Contract">Contract</option>

          <option value="Visiting">Visiting</option>

          <option value="Part Time">Part Time</option>
        </select>

        <textarea
          className="
border
p-2
rounded
w-full
"
          rows={3}
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <select
          className="
border
p-2
rounded
w-full
"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Active">Active</option>

          <option value="Inactive">Inactive</option>
        </select>

        <button
          onClick={saveStaff}
          className="
bg-black
text-white
px-5
py-2
rounded
w-full
sm:w-auto
"
        >
          {editingId ? "Update Staff" : "Create Staff"}
        </button>
      </div>

      {/* STAFF CARDS */}

      <div
        className="
grid
grid-cols-1
md:grid-cols-2
gap-4
"
      >
        {staff.map((member: any) => (
          <div
            key={member.id}
            className="
bg-white
rounded-xl
shadow
p-5
"
          >
            <h2
              className="
text-lg
md:text-xl
font-bold
"
            >
              {member.first_name} {member.last_name}
            </h2>

            <p className="mt-2">
              <strong>Designation:</strong> {member.designation}
            </p>

            <p>
              <strong>Department:</strong> {member.department}
            </p>

            <p>
              <strong>Qualification:</strong> {member.qualification}
            </p>

            <p>
              <strong>Experience:</strong> {member.experience} Years
            </p>

            <p>
              <strong>Salary:</strong> Rs. {member.salary}
            </p>

            <p>
              <strong>Joining Date:</strong> {member.joining_date}
            </p>

            <p>
              <strong>Employment Type:</strong> {member.employment_type}
            </p>

            <p>
              <strong>Status:</strong> {member.status}
            </p>

            <p className="break-all">
              <strong>Email:</strong> {member.email}
            </p>

            <p>
              <strong>Phone:</strong> {member.phone}
            </p>

            <p>
              <strong>Address:</strong> {member.address}
            </p>

            <div
              className="
flex
gap-3
mt-4
flex-wrap
"
            >
              <button
                onClick={() => {
                  setEditingId(member.id);

                  setFirstName(member.first_name);

                  setLastName(member.last_name);

                  setEmail(member.email);

                  setPhone(member.phone);

                  setDesignation(member.designation || "");

                  setDepartment(member.department || "");

                  setQualification(member.qualification || "");

                  setExperience(
                    member.experience ? String(member.experience) : "",
                  );

                  setSalary(member.salary ? String(member.salary) : "");

                  setJoiningDate(member.joining_date || "");

                  setEmploymentType(member.employment_type || "");

                  setAddress(member.address || "");

                  setStatus(member.status || "Active");
                }}
                className="
bg-yellow-500
text-white
px-3
py-2
rounded
"
              >
                Edit Staff
              </button>

              <button
                onClick={() => resetPassword(member.user_id)}
                className="
bg-green-500
text-white
px-3
py-2
rounded
"
              >
                Reset Password
              </button>

              <button
                onClick={() => deleteStaff(member.id)}
                className="
bg-red-500
text-white
px-3
py-2
rounded
hover:bg-red-600
"
              >
                Delete Staff
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
