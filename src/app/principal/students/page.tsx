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
    admission_date: "",

    gender: "male",
    date_of_birth: "",

    parent_name: "",
    parent_phone: "",

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
      admission_date: "",

      gender: "male",
      date_of_birth: "",

      parent_name: "",
      parent_phone: "",

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
      admission_date: student.admission_date || "",

      gender: student.gender,
      date_of_birth: student.date_of_birth || "",

      parent_name: student.parent_name || "",
      parent_phone: student.parent_phone || "",

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
      !form.admission_date ||
      !form.gender ||
      !form.date_of_birth ||
      !form.parent_name.trim() ||
      !form.parent_phone.trim() ||
      !form.email.trim() ||
      !form.phone.trim() ||
      !form.address.trim()
    ) {
      alert("Please fill all required fields");
      return;
    }

    try {
      const payload = {
        class_id: Number(form.class_id),
        section_id: Number(form.section_id),

        first_name: form.first_name,
        last_name: form.last_name,

        admission_number: form.admission_number,
        admission_date: form.admission_date,

        gender: form.gender,
        date_of_birth: form.date_of_birth,

        parent_name: form.parent_name,
        parent_phone: form.parent_phone,

        email: form.email,
        phone: form.phone,

        address: form.address,
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

  const deleteStudent = async (id: number) => {
  if (!confirm("Delete this student?")) return;

  try {
    await api.delete(`/students/${id}`);

    alert("Student deleted");

    fetchStudents();
  } catch (err) {
    console.log(err);
    alert("Delete failed");
  }
};
  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">
        Students Management
      </h1>

      <div className="bg-white p-4 sm:p-6 rounded shadow mb-6">
        <h2 className="font-bold text-lg mb-6">
          {editingId ? "Update Student" : "Add Student"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* CLASS */}

          <div>
            <label className="block text-sm font-medium mb-1">Class *</label>

            <select
              className="border p-2 rounded w-full"
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

              {classes.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  {cls.name}
                </option>
              ))}
            </select>
          </div>

          {/* SECTION */}

          <div>
            <label className="block text-sm font-medium mb-1">Section *</label>

            <select
              className="border p-2 rounded w-full"
              value={form.section_id}
              onChange={(e) =>
                setForm({
                  ...form,
                  section_id: e.target.value,
                })
              }
            >
              <option value="">Select Section</option>

              {filteredSections.map((section) => (
                <option key={section.id} value={section.id}>
                  {section.name}
                </option>
              ))}
            </select>
          </div>

          {/* FIRST NAME */}

          <div>
            <label className="block text-sm font-medium mb-1">
              First Name *
            </label>

            <input
              className="border p-2 rounded w-full"
              value={form.first_name}
              onChange={(e) =>
                setForm({
                  ...form,
                  first_name: e.target.value,
                })
              }
            />
          </div>

          {/* LAST NAME */}

          <div>
            <label className="block text-sm font-medium mb-1">
              Last Name *
            </label>

            <input
              className="border p-2 rounded w-full"
              value={form.last_name}
              onChange={(e) =>
                setForm({
                  ...form,
                  last_name: e.target.value,
                })
              }
            />
          </div>

          {/* ADMISSION NUMBER */}

          <div>
            <label className="block text-sm font-medium mb-1">
              Admission Number *
            </label>

            <input
              className="border p-2 rounded w-full"
              value={form.admission_number}
              onChange={(e) =>
                setForm({
                  ...form,
                  admission_number: e.target.value,
                })
              }
            />
          </div>

          {/* ADMISSION DATE */}

          <div>
            <label className="block text-sm font-medium mb-1">
              Admission Date *
            </label>

            <input
              type="date"
              className="border p-2 rounded w-full"
              value={form.admission_date}
              onChange={(e) =>
                setForm({
                  ...form,
                  admission_date: e.target.value,
                })
              }
            />
          </div>

          {/* GENDER */}

          <div>
            <label className="block text-sm font-medium mb-1">Gender *</label>

            <select
              className="border p-2 rounded w-full"
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

              <option value="other">Other</option>
            </select>
          </div>

          {/* DOB */}

          <div>
            <label className="block text-sm font-medium mb-1">
              Date of Birth *
            </label>

            <input
              type="date"
              className="border p-2 rounded w-full"
              value={form.date_of_birth}
              onChange={(e) =>
                setForm({
                  ...form,
                  date_of_birth: e.target.value,
                })
              }
            />
          </div>

          {/* PARENT NAME */}

          <div>
            <label className="block text-sm font-medium mb-1">
              Parent / Guardian Name *
            </label>

            <input
              className="border p-2 rounded w-full"
              value={form.parent_name}
              onChange={(e) =>
                setForm({
                  ...form,
                  parent_name: e.target.value,
                })
              }
            />
          </div>

          {/* PARENT PHONE */}

          <div>
            <label className="block text-sm font-medium mb-1">
              Parent Phone *
            </label>

            <input
              className="border p-2 rounded w-full"
              value={form.parent_phone}
              onChange={(e) =>
                setForm({
                  ...form,
                  parent_phone: e.target.value,
                })
              }
            />
          </div>

          {/* EMAIL */}

          <div>
            <label className="block text-sm font-medium mb-1">Email *</label>

            <input
              type="email"
              className="border p-2 rounded w-full"
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
            />
          </div>

          {/* PHONE */}

          <div>
            <label className="block text-sm font-medium mb-1">
              Student Phone *
            </label>

            <input
              className="border p-2 rounded w-full"
              value={form.phone}
              onChange={(e) =>
                setForm({
                  ...form,
                  phone: e.target.value,
                })
              }
            />
          </div>
        </div>

        {/* ADDRESS */}

        <div className="mt-4">
          <label className="block text-sm font-medium mb-1">Address *</label>

          <textarea
            rows={3}
            className="border p-2 rounded w-full"
            value={form.address}
            onChange={(e) =>
              setForm({
                ...form,
                address: e.target.value,
              })
            }
          />
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={createStudent}
            className="bg-black text-white px-5 py-2 rounded"
          >
            {editingId ? "Update Student" : "Create Student"}
          </button>

          {editingId && (
            <button
              onClick={resetForm}
              className="bg-gray-500 text-white px-5 py-2 rounded"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

     <div className="bg-white p-4 sm:p-6 rounded shadow">

  <h2 className="font-bold text-lg mb-4">
    All Students
  </h2>


  {/* Desktop Table */}

  <div className="hidden md:block overflow-x-auto">

    <table className="w-full text-sm">

      <thead className="border-b">

        <tr className="text-left">

          <th className="p-3">
            Name
          </th>

          <th className="p-3">
            Admission No
          </th>

          <th className="p-3">
            Class
          </th>

          <th className="p-3">
            Section
          </th>

          <th className="p-3">
            Email
          </th>

          <th className="p-3">
            Actions
          </th>

        </tr>

      </thead>


      <tbody>


        {students.map((student)=>(

          <tr 
            key={student.id}
            className="border-b"
          >

            <td className="p-3 font-medium">
              {student.first_name} {student.last_name}
            </td>


            <td className="p-3">
              {student.admission_number}
            </td>


            <td className="p-3">
              {getClassName(student.class_id)}
            </td>


            <td className="p-3">
              {getSectionName(student.section_id)}
            </td>


            <td className="p-3">
              {student.email}
            </td>



            <td className="p-3">

              <div className="flex gap-2">


                <button
                  onClick={()=>editStudent(student)}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>


                <button
                  onClick={()=>resetPassword(student.user_id)}
                  className="bg-orange-500 text-white px-3 py-1 rounded"
                >
                  Reset Password
                </button>


              </div>


            </td>


          </tr>


        ))}


      </tbody>


    </table>


  </div>





  {/* Mobile Cards */}

  <div className="md:hidden">


    {students.map((student)=>(

      <div
        key={student.id}
        className="border rounded p-4 mb-3"
      >


        <h3 className="font-bold text-lg">
          {student.first_name} {student.last_name}
        </h3>


        <p className="text-sm text-gray-600">
          Admission:
          {" "}
          {student.admission_number}
        </p>


        <p className="text-sm text-gray-600">
          Class:
          {" "}
          {getClassName(student.class_id)}
        </p>


        <p className="text-sm text-gray-600">
          Section:
          {" "}
          {getSectionName(student.section_id)}
        </p>


        <p className="text-sm text-gray-600 break-all">
          Email:
          {" "}
          {student.email}
        </p>



        <div className="flex flex-col gap-2 mt-4">


          <button
            onClick={()=>editStudent(student)}
            className="bg-yellow-500 text-white px-3 py-2 rounded"
          >
            Edit Student
          </button>



          <button
            onClick={()=>resetPassword(student.user_id)}
            className="bg-green-500 text-white px-3 py-2 rounded"
          >
            Reset Password
          </button>


        </div>


      </div>


    ))}


  </div>


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
