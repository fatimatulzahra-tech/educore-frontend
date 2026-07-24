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
    <div className="p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">
        Students Management
      </h1>

      <div className="bg-white p-4 sm:p-6 rounded shadow mb-6">
        <h2 className="font-bold mb-4">
          {editingId ? "Update Student" : "Add Student"}
        </h2>

        {/* Inputs/selects stay same */}

        <button
          onClick={createStudent}
          className="w-full sm:w-auto bg-black text-white px-4 py-2 rounded"
        >
          {editingId ? "Update Student" : "Create Student"}
        </button>
      </div>

      <div className="bg-white p-4 sm:p-6 rounded shadow">
        <h2 className="font-bold mb-4">All Students</h2>

        {students.map((student) => (
          <div key={student.id} className="border p-4 rounded mb-3">
            <p className="font-bold break-words">
              {student.first_name} {student.last_name}
            </p>

            <p className="text-sm text-gray-500 break-words">
              Admission: {student.admission_number}
            </p>

            <p className="text-sm text-gray-500 break-words">
              Email: {student.email}
            </p>

            <p className="text-sm text-gray-500">
              Class: {getClassName(student.class_id)}
            </p>

            <p className="text-sm text-gray-500">
              Section: {getSectionName(student.section_id)}
            </p>

            <div className="flex flex-col sm:flex-row gap-2 mt-4">
              <button
                onClick={() => editStudent(student)}
                className="w-full sm:w-auto bg-blue-500 text-white px-3 py-2 rounded"
              >
                Change Student
              </button>

              <button
                onClick={() => resetPassword(student.user_id)}
                className="w-full sm:w-auto bg-orange-500 text-white px-3 py-2 rounded"
              >
                Reset Password
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 mt-6">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="w-full sm:w-auto bg-black text-white px-4 py-2 rounded disabled:bg-gray-400"
        >
          Previous
        </button>

        <span className="text-sm sm:text-base">
          Page {page} of {totalPages}
        </span>

        <button
          onClick={() => setPage(page + 1)}
          disabled={page >= totalPages}
          className="w-full sm:w-auto bg-black text-white px-4 py-2 rounded disabled:bg-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  );
}
