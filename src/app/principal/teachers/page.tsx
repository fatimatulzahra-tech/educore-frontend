"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [qualification, setQualification] = useState("");

  const [experience, setExperience] = useState("");

  const [salary, setSalary] = useState("");

  const [joiningDate, setJoiningDate] = useState("");

  const [employmentType, setEmploymentType] = useState("");

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const res = await api.get("/teachers");

      setTeachers(res.data);
    } catch (err) {
      console.log(err);
      setTeachers([]);
    }
  };

  const saveTeacher = async () => {
    try {
      if (editingId) {
        await api.put(`/teachers/${editingId}`, {
          first_name: firstName,
          last_name: lastName,
          email,
          phone,
          subject,
          qualification,
          experience,
          salary,
          joining_date: joiningDate,
          employment_type: employmentType,
        });

        alert("Teacher updated");
      } else {
        await api.post("/teachers", {
          first_name: firstName,
          last_name: lastName,
          email,
          phone,
          subject,
          qualification,
          experience,
          salary,
          joining_date: joiningDate,
          employment_type: employmentType,
        });

        alert("Teacher created");
      }

      setEditingId(null);

      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setSubject("");
      setQualification("");

      setExperience("");

      setSalary("");

      setJoiningDate("");

      setEmploymentType("");

      fetchTeachers();
    } catch (err) {
      console.log(err);
      alert("Operation failed");
    }
  };

  const deleteTeacher = async (id: number) => {
    if (!confirm("Delete this teacher?")) return;

    try {
      await api.delete(`/teachers/${id}`);

      fetchTeachers();
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
      <h1
        className="
        text-3xl
        md:text-4xl
        font-bold
        mb-6
        md:mb-8
      "
      >
        Teachers
      </h1>

      {/* FORM */}

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
          onChange={(e) => setEmail(e.target.value)}
          disabled={editingId !== null}
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
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
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
        <button
          onClick={saveTeacher}
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
          {editingId ? "Update Teacher" : "Create Teacher"}
        </button>
      </div>

      {/* TEACHER CARDS */}

      <div
        className="
        grid
        grid-cols-1
        md:grid-cols-2
        gap-4
      "
      >
        {teachers.map((teacher: any) => (
          <div
            key={teacher.id}
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
              {teacher.first_name} {teacher.last_name}
            </h2>

            <p className="mt-2">
              <strong>Subject:</strong> {teacher.subject}
            </p>

            <p>
              <strong>Qualification:</strong> {teacher.qualification}
            </p>

            <p>
              <strong>Experience:</strong> {teacher.experience} Years
            </p>

            <p>
              <strong>Salary:</strong> Rs. {teacher.salary}
            </p>

            <p>
              <strong>Joining Date:</strong> {teacher.joining_date}
            </p>

            <p>
              <strong>Employment Type:</strong> {teacher.employment_type}
            </p>

            <p className="break-all">
              <strong>Email:</strong> {teacher.email}
            </p>

            <p>
              <strong>Phone:</strong> {teacher.phone}
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
                  setEditingId(teacher.id);

                  setFirstName(teacher.first_name);
                  setLastName(teacher.last_name);
                  setEmail(teacher.email);
                  setPhone(teacher.phone);
                  setSubject(teacher.subject);

                  setQualification(teacher.qualification || "");

                  setExperience(
                    teacher.experience ? String(teacher.experience) : "",
                  );

                  setSalary(teacher.salary ? String(teacher.salary) : "");

                  setJoiningDate(teacher.joining_date || "");

                  setEmploymentType(teacher.employment_type || "");
                }}
                className="
                  bg-yellow-500
                  text-white
                  px-3
                  py-2
                  rounded
                "
              >
                Edit Teacher
              </button>

              <button
                onClick={() => resetPassword(teacher.user_id)}
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
                onClick={() => deleteTeacher(teacher.id)}
                className="
                  bg-red-500
                  text-white
                  px-3
                  py-2
                  rounded
                  hover:bg-red-600
                "
              >
                Delete Teacher
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
