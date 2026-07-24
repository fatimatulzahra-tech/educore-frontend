"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/services/api";

interface Exam {
  id: number;
  title: string;
  subject_id: number;
  class_id: number;
  section_id: number;
  total_marks: number;
}

export default function ExamsPage() {
  const [exams, setExams] = useState<Exam[]>([]);
  const [classes, setClasses] = useState<any[]>([]);
  const [sections, setSections] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [examRes, classRes, sectionRes, subjectRes] =
        await Promise.all([
          api.get("/exams", {
            params: {
              class_id: 1,
              section_id: 1,
            },
          }),
          api.get("/classes"),
          api.get("/sections"),
          api.get("/exams/subjects"),
        ]);

      setExams(examRes.data);
      setClasses(classRes.data || []);
      setSections(sectionRes.data || []);
      setSubjects(subjectRes.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getClassName = (id: number) => {
    return classes.find((c) => c.id === id)?.name || "-";
  };

  const getSectionName = (id: number) => {
    return sections.find((s) => s.id === id)?.name || "-";
  };

  const getSubjectName = (id: number) => {
    return subjects.find((s) => s.id === id)?.name || "-";
  };

  return (
    <div className="p-4 sm:p-6">

      <div className="mb-6 sm:mb-8">

        <h1 className="text-2xl sm:text-3xl font-bold">
          Exam Management
        </h1>

        <p className="text-gray-500 mt-2 text-sm sm:text-base">
          Create exams, manage marks and monitor assessments.
        </p>

      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-10">

        <Link href="/principal/exams/create">

          <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-5 sm:p-6 cursor-pointer">

            <h2 className="text-lg sm:text-xl font-semibold mb-2">
              Create Exam
            </h2>

            <p className="text-gray-500 text-sm sm:text-base">
              Schedule a new examination.
            </p>

          </div>

        </Link>


        <Link href="/principal/exams/marks">

          <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-5 sm:p-6 cursor-pointer">

            <h2 className="text-lg sm:text-xl font-semibold mb-2">
              Manage Marks
            </h2>

            <p className="text-gray-500 text-sm sm:text-base">
              Add and review students' marks.
            </p>

          </div>

        </Link>

      </div>


      <h2 className="text-xl sm:text-2xl font-semibold mb-5">
        Existing Exams
      </h2>


      {loading ? (

        <div className="bg-white rounded-xl shadow p-5 sm:p-6">
          Loading exams...
        </div>

      ) : exams.length === 0 ? (

        <div className="bg-white rounded-xl shadow p-5 sm:p-6 text-gray-500">
          No exams created yet.
        </div>

      ) : (

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">

          {exams.map((exam) => (

            <div
              key={exam.id}
              className="bg-white rounded-xl shadow p-5 sm:p-6"
            >

              <h3 className="text-lg sm:text-xl font-bold mb-4 break-words">
                {exam.title}
              </h3>


              <div className="space-y-2 text-sm sm:text-base">

                <p>
                  <strong>Subject:</strong>{" "}
                  {getSubjectName(exam.subject_id)}
                </p>


                <p>
                  <strong>Class:</strong>{" "}
                  {getClassName(exam.class_id)}
                </p>


                <p>
                  <strong>Section:</strong>{" "}
                  {getSectionName(exam.section_id)}
                </p>


                <p>
                  <strong>Total Marks:</strong>{" "}
                  {exam.total_marks}
                </p>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}