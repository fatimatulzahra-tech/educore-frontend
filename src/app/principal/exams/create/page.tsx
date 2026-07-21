"use client";

import { useEffect, useMemo, useState } from "react";
import api from "@/services/api";

export default function CreateExam() {
  const [title, setTitle] = useState("");

  const [classes, setClasses] = useState<any[]>([]);
  const [sections, setSections] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);

  const [classId, setClassId] = useState("");
  const [sectionId, setSectionId] = useState("");
  const [subjectId, setSubjectId] = useState("");

  const [totalMarks, setTotalMarks] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [classRes, sectionRes, subjectRes] = await Promise.all([
        api.get("/classes"),
        api.get("/sections"),
        api.get("/exams/subjects"),
      ]);

      setClasses(classRes.data || []);
      setSections(sectionRes.data || []);
      setSubjects(subjectRes.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  const filteredSections = useMemo(() => {
    return sections.filter(
      (section) => section.class_id === Number(classId)
    );
  }, [sections, classId]);

  const submit = async () => {
    if (
      !title ||
      !classId ||
      !sectionId ||
      !subjectId ||
      !totalMarks
    ) {
      alert("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);

      await api.post("/exams", {
        title,
        class_id: Number(classId),
        section_id: Number(sectionId),
        subject_id: Number(subjectId),
        total_marks: Number(totalMarks),
      });

      alert("Exam created successfully.");

      setTitle("");
      setClassId("");
      setSectionId("");
      setSubjectId("");
      setTotalMarks("");

    } catch (err) {
      console.log(err);
      alert("Failed to create exam.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl">

      <h1 className="text-3xl font-bold mb-2">
        Create Exam
      </h1>

      <p className="text-gray-500 mb-8">
        Schedule a new examination.
      </p>

      <div className="bg-white rounded-xl shadow p-6 space-y-5">

        <div>
          <label className="block font-medium mb-2">
            Exam Title
          </label>

          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Mid Term Examination"
            className="border rounded-lg w-full px-4 py-2"
          />
        </div>

        <div>
          <label className="block font-medium mb-2">
            Class
          </label>

          <select
            value={classId}
            onChange={(e) => {
              setClassId(e.target.value);
              setSectionId("");
            }}
            className="border rounded-lg w-full px-4 py-2"
          >
            <option value="">Select Class</option>

            {classes.map((cls) => (
              <option key={cls.id} value={cls.id}>
                {cls.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium mb-2">
            Section
          </label>

          <select
            value={sectionId}
            onChange={(e) => setSectionId(e.target.value)}
            className="border rounded-lg w-full px-4 py-2"
          >
            <option value="">Select Section</option>

            {filteredSections.map((section) => (
              <option key={section.id} value={section.id}>
                {section.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium mb-2">
            Subject
          </label>

          <select
            value={subjectId}
            onChange={(e) => setSubjectId(e.target.value)}
            className="border rounded-lg w-full px-4 py-2"
          >
            <option value="">Select Subject</option>

            {subjects.map((subject) => (
              <option key={subject.id} value={subject.id}>
                {subject.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium mb-2">
            Total Marks
          </label>

          <input
            type="number"
            value={totalMarks}
            onChange={(e) => setTotalMarks(e.target.value)}
            className="border rounded-lg w-full px-4 py-2"
          />
        </div>

        <button
          onClick={submit}
          disabled={loading}
          className="bg-black text-white px-6 py-3 rounded-lg"
        >
          {loading ? "Creating..." : "Create Exam"}
        </button>

      </div>
    </div>
  );
}