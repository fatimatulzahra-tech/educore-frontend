"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";

export default function StudentsPage() {
  const [students, setStudents] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [classes, setClasses] = useState<any[]>([]);
  const [sections, setSections] = useState<any[]>([]);
  const [totalStudents, setTotalStudents] = useState(0);

  const [editingId, setEditingId] = useState<number | null>(null);

  const [form, setForm] = useState({
    class_id: "",
    section_id: "",
    first_name: "",
    last_name: "",
    admission_number: "",
    gender: "male",
    email: "",
    phone: "",
    address: "",
  });

  const filteredSections = sections.filter(
    (section) => section.class_id === Number(form.class_id),
  );

  const fetchStudents = async () => {
    try {
      const res = await api.get(`/students?page=${page}&limit=10`);

      setStudents(res.data.data || []);
      setTotalStudents(res.data.total || 0);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchClasses = async () => {
    try {
      const res = await api.get("/classes");
      setClasses(res.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchSections = async () => {
    try {
      const res = await api.get("/sections");
      setSections(res.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [page]);

  useEffect(() => {
    fetchClasses();
    fetchSections();
  }, []);

  const resetForm = () => {
    setEditingId(null);

    setForm({
      class_id: "",
      section_id: "",
      first_name: "",
      last_name: "",
      admission_number: "",
      gender: "male",
      email: "",
      phone: "",
      address: "",
    });
  };

  const editStudent = (student: any) => {
    setEditingId(student.id);

    setForm({
      class_id: String(student.class_id),
      section_id: String(student.section_id),
      first_name: student.first_name,
      last_name: student.last_name,
      admission_number: student.admission_number,
      gender: student.gender,
      email: student.email || "",
      phone: student.phone || "",
      address: student.address || "",
    });
  };

  const createStudent = async () => {
    if (
      !form.class_id ||
      !form.section_id ||
      !form.first_name.trim() ||
      !form.last_name.trim() ||
      !form.admission_number.trim() ||
      !form.email.trim()
    ) {
      alert("Please fill all required fields");
      return;
    }

    try {
      const payload = {
        ...form,
        class_id: Number(form.class_id),
        section_id: Number(form.section_id),
      };

      if (editingId) {
        await api.put(`/students/${editingId}`, payload);
        alert("Student Updated");
      } else {
        await api.post("/students", payload);
        alert("Student Created");
      }

      fetchStudents();
      resetForm();
    } catch (err) {
      console.log(err);
      alert("Operation failed");
    }
  };

  const getClassName = (classId: number) => {
    const cls = classes.find((c) => c.id === classId);
    return cls ? cls.name : "Unknown Class";
  };

  const getSectionName = (sectionId: number) => {
    const sec = sections.find((s) => s.id === sectionId);
    return sec ? sec.name : "Unknown Section";
  };

  const totalPages = Math.ceil(totalStudents / 10);
  const resetPassword = async (userId: number) => {
    try {
      const res = await api.post("/auth/admin-reset-password", {
        user_id: userId,
      });

      alert(
        `Password reset.\nTemporary password: ${res.data.temporary_password}`,
      );
    } catch {
      alert("Password reset failed");
    }
  };
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Students Management</h1>

      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="font-bold mb-4">
          {editingId ? "Update Student" : "Add Student"}
        </h2>

        <select
          className="border p-2 w-full mb-2"
          value={form.class_id}
          onChange={(e) =>
            setForm({
              ...form,
              class_id: e.target.value,
              section_id: "",
            })
          }
        >
          <option value="">Select Class</option>

          {classes.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <select
          className="border p-2 w-full mb-2"
          value={form.section_id}
          onChange={(e) =>
            setForm({
              ...form,
              section_id: e.target.value,
            })
          }
        >
          <option value="">Select Section</option>

          {filteredSections.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>

        <input
          className="border p-2 w-full mb-2"
          placeholder="First Name"
          value={form.first_name}
          onChange={(e) =>
            setForm({
              ...form,
              first_name: e.target.value,
            })
          }
        />

        <input
          className="border p-2 w-full mb-2"
          placeholder="Last Name"
          value={form.last_name}
          onChange={(e) =>
            setForm({
              ...form,
              last_name: e.target.value,
            })
          }
        />

        <input
          className="border p-2 w-full mb-2"
          placeholder="Admission Number"
          value={form.admission_number}
          onChange={(e) =>
            setForm({
              ...form,
              admission_number: e.target.value,
            })
          }
        />

        <input
          type="email"
          className="border p-2 w-full mb-2"
          placeholder="Student Email"
          value={form.email}
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value,
            })
          }
        />

        <input
          className="border p-2 w-full mb-2"
          placeholder="Phone"
          value={form.phone}
          onChange={(e) =>
            setForm({
              ...form,
              phone: e.target.value,
            })
          }
        />

        <input
          className="border p-2 w-full mb-2"
          placeholder="Address"
          value={form.address}
          onChange={(e) =>
            setForm({
              ...form,
              address: e.target.value,
            })
          }
        />

        <select
          className="border p-2 w-full mb-4"
          value={form.gender}
          onChange={(e) =>
            setForm({
              ...form,
              gender: e.target.value,
            })
          }
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <button
          onClick={createStudent}
          className="bg-black text-white px-4 py-2 rounded"
        >
          {editingId ? "Update Student" : "Create Student"}
        </button>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-bold mb-4">All Students</h2>

        {students.map((student) => (
          <div key={student.id} className="border p-4 rounded mb-3">
            <p className="font-bold">
              {student.first_name} {student.last_name}
            </p>

            <p className="text-sm text-gray-500">
              Admission: {student.admission_number}
            </p>

            <p className="text-sm text-gray-500">Email: {student.email}</p>

            <p className="text-sm text-gray-500">
              Class: {getClassName(student.class_id)}
            </p>

            <p className="text-sm text-gray-500">
              Section: {getSectionName(student.section_id)}
            </p>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => editStudent(student)}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Change Student
              </button>

              <button
                onClick={() => resetPassword(student.user_id)}
                className="bg-orange-500 text-white px-3 py-1 rounded"
              >
                Reset Password
              </button>

              {/* Delete button later */}
              {/*
  <button
    onClick={() => deleteStudent(student.id)}
    className="bg-red-500 text-white px-3 py-1 rounded"
  >
    Delete
  </button>
  */}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="bg-black text-white px-4 py-2 rounded disabled:bg-gray-400"
        >
          Previous
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          onClick={() => setPage(page + 1)}
          disabled={page >= totalPages}
          className="bg-black text-white px-4 py-2 rounded disabled:bg-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  );
}
