"use client";

import api from "@/services/api";
import { useEffect, useState } from "react";

interface Exam {
  id: number;

  title: string;

  subject: string;

  class_name: string;

  section_name: string;

  total_marks: number;
}

export default function ExamsPage() {
  const [exams, setExams] = useState<Exam[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExams();
  }, []);

  async function fetchExams() {
    try {
      const res = await api.get("/exams/teacher");

      setExams(res.data || []);
    } catch (error) {
      console.error("Failed to load exams", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">My Exams</h1>

        <p className="text-gray-500 mt-1">
          View exams assigned to your classes.
        </p>
      </div>

      <div className="rounded-lg border bg-white">
        <table className="w-full">
          <thead className="border-b bg-gray-50">
            <tr>
              <th className="p-3 text-left">Exam</th>

              <th className="p-3 text-left">Subject</th>

              <th className="p-3 text-left">Class</th>

              <th className="p-3 text-left">Section</th>

              <th className="p-3 text-left">Total Marks</th>

              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="p-5 text-center">
                  Loading...
                </td>
              </tr>
            ) : exams.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-5 text-center">
                  No exams found
                </td>
              </tr>
            ) : (
              exams.map((exam) => (
                <tr key={exam.id} className="border-b hover:bg-gray-50">
                  <td className="p-3 font-medium">{exam.title}</td>

                  <td className="p-3">{exam.subject}</td>

                  <td className="p-3">Grade {exam.class_name}</td>

                  <td className="p-3">{exam.section_name}</td>

                  <td className="p-3">{exam.total_marks}</td>

                  <td className="p-3 text-center">
                    <a
                      href={`/teacher/exams/marks?exam=${exam.id}`}
                      className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                    >
                      Enter Marks
                    </a>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
