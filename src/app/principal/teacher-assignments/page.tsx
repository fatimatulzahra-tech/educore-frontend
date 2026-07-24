"use client";

import { useEffect, useState } from "react";

import api from "@/services/api";

export default function TeacherAssignmentsPage() {
  const [teachers, setTeachers] = useState<any[]>([]);
  const [classes, setClasses] = useState<any[]>([]);
  const [sections, setSections] = useState<any[]>([]);
  const [assignments, setAssignments] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [teacherId, setTeacherId] = useState("");
  const [classId, setClassId] = useState("");
  const [sectionId, setSectionId] = useState("");
  const [subject, setSubject] = useState("");
  const filteredSections = sections.filter(
    (section) => section.class_id === Number(classId),
  );
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const t = await api.get("/teachers");
      const c = await api.get("/classes");
      const s = await api.get("/sections");
      const a = await api.get("/teacher-assignments");

      setTeachers(t.data);
      setClasses(c.data);
      setSections(s.data);
      setAssignments(a.data);
    } catch (err) {
      console.log(err);
    }
  };

  const editAssignment = (assignment: any) => {
    setEditingId(assignment.id);

    setTeacherId(String(assignment.teacher_id));

    setClassId(String(assignment.class_id));

    setSectionId(String(assignment.section_id));

    setSubject(assignment.subject);
  };

  const assignTeacher = async () => {
    if (!teacherId || !classId  || !subject.trim()) {
      alert("Please fill all fields");

      return;
    }

    try {
      if (editingId) {
        await api.put(
          `/teacher-assignments/${editingId}`,

          null,

          {
            params: {
              teacher_id: teacherId,

              class_id: classId,

              section_id: sectionId,

              subject: subject,
            },
          },
        );

        alert("Assignment Updated");
      } else {
        await api.post(
          "/teacher-assignments",

          null,

          {
            params: {
              teacher_id: teacherId,

              class_id: classId,

              section_id: sectionId,

              subject: subject,
            },
          },
        );

        alert("Teacher Assigned");
      }

      setEditingId(null);

      setTeacherId("");
      setClassId("");
      setSectionId("");
      setSubject("");

      loadData();
    } catch {
      alert("Operation failed");
    }
  };
  const getTeacherName = (teacherId: number) => {
    const teacher = teachers.find((t) => t.id === teacherId);

    return teacher
      ? `${teacher.first_name} ${teacher.last_name}`
      : "Unknown Teacher";
  };

  const getClassName = (classId: number) => {
    const cls = classes.find((c) => c.id === classId);

    return cls ? cls.name : "Unknown Class";
  };

  const getSectionName = (sectionId: number) => {
    const section = sections.find((s) => s.id === sectionId);

    return section ? section.name : "Unknown Section";
  };
  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Teacher Assignments</h1>

      <div className="bg-white p-6 rounded shadow mb-8">
        <div className="space-y-4">
          <select
            className="border p-2 w-full"
            onChange={(e) => setTeacherId(e.target.value)}
          >
            <option>Select Teacher</option>

            {teachers.map((teacher) => (
              <option key={teacher.id} value={teacher.id}>
                {teacher.first_name} {teacher.last_name}
              </option>
            ))}
          </select>

          <select
            className="border p-2 w-full"
            onChange={(e) => setClassId(e.target.value)}
          >
            <option>Select Class</option>

            {classes.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <select
            className="border p-2 w-full"
            onChange={(e) => setSectionId(e.target.value)}
          >
            <option>Select Section</option>

            {filteredSections.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>

          <input
            className="border p-2 w-full"
            placeholder="Subject"
            onChange={(e) => setSubject(e.target.value)}
          />

          <button
            className="bg-black text-white px-5 py-2 rounded"
            onClick={assignTeacher}
          >
            {editingId ? "Update Assignment" : "Assign Teacher"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {assignments.map((assignment) => (
          <div key={assignment.id} className="bg-white p-5 rounded shadow">
            <h2 className="text-lg font-bold mb-3">{assignment.subject}</h2>

            <p>
              <strong>Teacher:</strong> {getTeacherName(assignment.teacher_id)}
            </p>

            <p>
              <strong>Class:</strong> {getClassName(assignment.class_id)}
            </p>

            <p>
              <strong>Section:</strong> {getSectionName(assignment.section_id)}
            </p>

            <button
              onClick={() => editAssignment(assignment)}
              className="
          mt-4
          bg-blue-500
          text-white
          px-4
          py-2
          rounded
        "
            >
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
