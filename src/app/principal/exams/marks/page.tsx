"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";

export default function MarksPage() {
  const [marks, setMarks] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [exams, setExams] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    student_id: "",
    exam_id: "",
    subject_id: "",
    obtained_marks: "",
    total_marks: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [
        marksRes,
        studentsRes,
        examsRes,
        subjectsRes,
      ] = await Promise.all([
        api.get("/exams/marks"),
        api.get("/students?page=1&limit=100"),
        api.get("/exams", {
          params: {
            class_id: 1,
            section_id: 1,
          },
        }),
        api.get("/exams/subjects"),
      ]);

      setMarks(marksRes.data || []);
      setStudents(studentsRes.data.data || []);
      setExams(examsRes.data || []);
      setSubjects(subjectsRes.data || []);

    } catch (err) {
      console.error(err);
    }
  };

  const submit = async () => {
    if (
      !form.student_id ||
      !form.exam_id ||
      !form.subject_id ||
      !form.obtained_marks ||
      !form.total_marks
    ) {
      alert("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);

      await api.post("/exams/marks", {
        student_id: Number(form.student_id),
        exam_id: Number(form.exam_id),
        subject_id: Number(form.subject_id),
        obtained_marks: Number(form.obtained_marks),
        total_marks: Number(form.total_marks),
      });

      alert("Marks added successfully.");

      setForm({
        student_id: "",
        exam_id: "",
        subject_id: "",
        obtained_marks: "",
        total_marks: "",
      });

      loadData();

    } catch (err) {
      console.error(err);
      alert("Failed to save marks.");
    } finally {
      setLoading(false);
    }
  };

  const getStudentName = (id: number) => {
    const student = students.find((s) => s.id === id);

    return student
      ? `${student.first_name} ${student.last_name}`
      : "Unknown Student";
  };

  const getExamTitle = (id: number) => {
    const exam = exams.find((e) => e.id === id);

    return exam ? exam.title : "Unknown Exam";
  };

  const getSubjectName = (id: number) => {
    const subject = subjects.find((s) => s.id === id);

    return subject ? subject.name : "Unknown Subject";
  };

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-8">
        Marks Management
      </h1>

      <div className="bg-white rounded-xl shadow p-6 mb-8 space-y-5">

        <div>
          <label className="block font-medium mb-2">
            Student
          </label>

          <select
            className="w-full border rounded-lg px-4 py-2"
            value={form.student_id}
            onChange={(e) =>
              setForm({
                ...form,
                student_id: e.target.value,
              })
            }
          >
            <option value="">
              Select Student
            </option>

            {students.map((student) => (
              <option
                key={student.id}
                value={student.id}
              >
                {student.first_name} {student.last_name}
              </option>
            ))}

          </select>
        </div>

        <div>
          <label className="block font-medium mb-2">
            Exam
          </label>

          <select
            className="w-full border rounded-lg px-4 py-2"
            value={form.exam_id}
            onChange={(e) =>
              setForm({
                ...form,
                exam_id: e.target.value,
              })
            }
          >
            <option value="">
              Select Exam
            </option>

            {exams.map((exam) => (
              <option
                key={exam.id}
                value={exam.id}
              >
                {exam.title}
              </option>
            ))}

          </select>
        </div>

        <div>
          <label className="block font-medium mb-2">
            Subject
          </label>

          <select
            className="w-full border rounded-lg px-4 py-2"
            value={form.subject_id}
            onChange={(e) =>
              setForm({
                ...form,
                subject_id: e.target.value,
              })
            }
          >
            <option value="">
              Select Subject
            </option>

            {subjects.map((subject) => (
              <option
                key={subject.id}
                value={subject.id}
              >
                {subject.name}
              </option>
            ))}

          </select>
        </div>

        <div>
          <label className="block font-medium mb-2">
            Obtained Marks
          </label>

          <input
            type="number"
            className="w-full border rounded-lg px-4 py-2"
            value={form.obtained_marks}
            onChange={(e) =>
              setForm({
                ...form,
                obtained_marks: e.target.value,
              })
            }
          />
        </div>

        <div>
          <label className="block font-medium mb-2">
            Total Marks
          </label>

          <input
            type="number"
            className="w-full border rounded-lg px-4 py-2"
            value={form.total_marks}
            onChange={(e) =>
              setForm({
                ...form,
                total_marks: e.target.value,
              })
            }
          />
        </div>

        <button
          onClick={submit}
          disabled={loading}
          className="bg-black text-white px-6 py-3 rounded-lg disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Marks"}
        </button>

      </div>

      <h2 className="text-2xl font-semibold mb-5">
        Existing Marks
      </h2>

      {marks.length === 0 ? (

        <div className="bg-white rounded-xl shadow p-6 text-gray-500">
          No marks available.
        </div>

      ) : (

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

          {marks.map((mark) => (

            <div
              key={mark.id}
              className="bg-white rounded-xl shadow p-6"
            >

              <p>
                <strong>Student:</strong>{" "}
                {getStudentName(mark.student_id)}
              </p>

              <p>
                <strong>Exam:</strong>{" "}
                {getExamTitle(mark.exam_id)}
              </p>

              <p>
                <strong>Subject:</strong>{" "}
                {getSubjectName(mark.subject_id)}
              </p>

              <p>
                <strong>Marks:</strong>{" "}
                {mark.obtained_marks} / {mark.total_marks}
              </p>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}