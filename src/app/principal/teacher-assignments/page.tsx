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
    (section) => section.class_id === Number(classId)
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
    if (!teacherId || !classId || !sectionId || !subject.trim()) {
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
              subject,
            },
          }
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
              subject,
            },
          }
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


  const getTeacherName = (teacherId:number) => {
    const teacher = teachers.find(
      (t)=>t.id===teacherId
    );

    return teacher
      ? `${teacher.first_name} ${teacher.last_name}`
      : "Unknown Teacher";
  };


  const getClassName = (classId:number) => {
    const cls = classes.find(
      (c)=>c.id===classId
    );

    return cls ? cls.name : "Unknown Class";
  };


  const getSectionName = (sectionId:number) => {
    const section = sections.find(
      (s)=>s.id===sectionId
    );

    return section ? section.name : "Unknown Section";
  };


  return (
    <div className="w-full">

      <h1 className="
        text-2xl 
        sm:text-3xl 
        lg:text-4xl 
        font-bold 
        mb-6 
        sm:mb-8
      ">
        Teacher Assignments
      </h1>


      {/* FORM */}

      <div className="
        bg-white 
        p-4 
        sm:p-6 
        rounded-xl 
        shadow 
        mb-8
      ">

        <div className="space-y-4">


          <select
            className="
              border 
              p-3 
              rounded-lg
              w-full
              text-sm
              sm:text-base
            "
            value={teacherId}
            onChange={(e)=>setTeacherId(e.target.value)}
          >

            <option>Select Teacher</option>

            {teachers.map((teacher)=>(
              <option
                key={teacher.id}
                value={teacher.id}
              >
                {teacher.first_name} {teacher.last_name}
              </option>
            ))}

          </select>



          <select
            className="
              border 
              p-3 
              rounded-lg
              w-full
              text-sm
              sm:text-base
            "
            value={classId}
            onChange={(e)=>setClassId(e.target.value)}
          >

            <option>Select Class</option>

            {classes.map((c)=>(
              <option
                key={c.id}
                value={c.id}
              >
                {c.name}
              </option>
            ))}

          </select>




          <select
            className="
              border 
              p-3 
              rounded-lg
              w-full
              text-sm
              sm:text-base
            "
            value={sectionId}
            onChange={(e)=>setSectionId(e.target.value)}
          >

            <option>Select Section</option>

            {filteredSections.map((s)=>(
              <option
                key={s.id}
                value={s.id}
              >
                {s.name}
              </option>
            ))}

          </select>




          <input
            className="
              border 
              p-3 
              rounded-lg
              w-full
            "
            value={subject}
            placeholder="Subject"
            onChange={(e)=>setSubject(e.target.value)}
          />



          <button
            className="
              bg-black
              text-white
              px-5
              py-3
              rounded-lg
              w-full
              sm:w-auto
            "
            onClick={assignTeacher}
          >
            {editingId
              ? "Update Assignment"
              : "Assign Teacher"}
          </button>


        </div>

      </div>



      {/* ASSIGNMENT CARDS */}


      <div className="
        grid
        grid-cols-1
        sm:grid-cols-2
        xl:grid-cols-3
        gap-4
      ">


        {assignments.map((assignment)=>(

          <div
            key={assignment.id}
            className="
              bg-white
              p-4
              sm:p-5
              rounded-xl
              shadow
              overflow-hidden
            "
          >

            <h2 className="
              text-lg
              font-bold
              mb-3
              break-words
            ">
              {assignment.subject}
            </h2>



            <div className="
              space-y-2
              text-sm
              sm:text-base
            ">

              <p className="break-words">
                <strong>Teacher:</strong>{" "}
                {getTeacherName(assignment.teacher_id)}
              </p>


              <p>
                <strong>Class:</strong>{" "}
                {getClassName(assignment.class_id)}
              </p>


              <p>
                <strong>Section:</strong>{" "}
                {getSectionName(assignment.section_id)}
              </p>


            </div>



            <button
              onClick={()=>editAssignment(assignment)}
              className="
                mt-4
                bg-blue-500
                text-white
                px-4
                py-2
                rounded-lg
                w-full
                sm:w-auto
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