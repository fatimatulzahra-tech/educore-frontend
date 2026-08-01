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
  const [assignmentRows, setAssignmentRows] = useState([
  {
    classId: "",
    sectionId: "",
    subject: "",
  },
]);

 

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
  const addAssignmentRow = () => {
  setAssignmentRows([
    ...assignmentRows,
    {
      classId: "",
      sectionId: "",
      subject: "",
    },
  ]);
};

const editAssignment = (assignment: any) => {

  setEditingId(assignment.id);

  setTeacherId(String(assignment.teacher_id));

  setAssignmentRows([
    {
      classId: String(assignment.class_id),
      sectionId: String(assignment.section_id),
      subject: assignment.subject,
    },
  ]);

};
const removeAssignmentRow = (index: number) => {
  const rows = [...assignmentRows];

  rows.splice(index, 1);

  setAssignmentRows(rows);
};

  const updateAssignmentRow = (
  index: number,
  field: "classId" | "sectionId" | "subject",
  value: string
) => {
  const rows = [...assignmentRows];

  rows[index][field] = value;

  // If class changes, clear section
  if (field === "classId") {
    rows[index].sectionId = "";
  }

  setAssignmentRows(rows);
};
  const assignTeacher = async () => {
    if (!teacherId) {
  alert("Please select a teacher");
  return;
}

const invalidRow = assignmentRows.find(
  (row) =>
    !row.classId ||
    !row.sectionId ||
    !row.subject.trim()
);

    if (invalidRow) {
          alert("Please complete every assignment.");
     return;
    } 

    try {
      if (editingId) {
        await api.put(
          `/teacher-assignments/${editingId}`,
          null,
          {
            data: {
  teacher_id: teacherId,

  assignments: assignmentRows.map((row) => ({
    class_id: row.classId,
    section_id: row.sectionId,
    subject: row.subject,
  })),
}
          }
        );

        alert("Assignment Updated");
      } else {
        await api.post(
          "/teacher-assignments",
          null,
          {
            data: {
  teacher_id: teacherId,

  assignments: assignmentRows.map((row) => ({
    class_id: row.classId,
    section_id: row.sectionId,
    subject: row.subject,
  })),
}
          }
        );

        alert("Teacher Assigned");
      }

      setEditingId(null);
      setTeacherId("");

setAssignmentRows([
  {
    classId: "",
    sectionId: "",
    subject: "",
  },
]);

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
{assignmentRows.map((row, index) => {

  const filteredSections = sections.filter(
    (section) =>
      section.class_id === Number(row.classId)
  );

  return (

    <div
      key={index}
      className="
        border
        rounded-lg
        p-4
        space-y-3
      "
    >

      <h3 className="font-semibold">
        Assignment {index + 1}
      </h3>


      {/* CLASS */}

      <select
        className="
          border
          p-3
          rounded-lg
          w-full
        "
        value={row.classId}
        onChange={(e)=>
          updateAssignmentRow(
            index,
            "classId",
            e.target.value
          )
        }
      >

        <option value="">
          Select Class
        </option>

        {classes.map((cls)=>(
          <option
            key={cls.id}
            value={cls.id}
          >
            {cls.name}
          </option>
        ))}

      </select>


      {/* SECTION */}

      <select
        className="
          border
          p-3
          rounded-lg
          w-full
        "
        value={row.sectionId}
        onChange={(e)=>
          updateAssignmentRow(
            index,
            "sectionId",
            e.target.value
          )
        }
      >

        <option value="">
          Select Section
        </option>

        {filteredSections.map((section)=>(
          <option
            key={section.id}
            value={section.id}
          >
            {section.name}
          </option>
        ))}

      </select>


      {/* SUBJECT */}

      <input
        className="
          border
          p-3
          rounded-lg
          w-full
        "
        placeholder="Subject"
        value={row.subject}
        onChange={(e)=>
          updateAssignmentRow(
            index,
            "subject",
            e.target.value
          )
        }
      />


      {assignmentRows.length > 1 && (

        <button
          type="button"
          onClick={()=>
            removeAssignmentRow(index)
          }
          className="
            bg-red-500
            text-white
            px-4
            py-2
            rounded
          "
        >
          Remove Assignment
        </button>

      )}

    </div>

  );

})}


         




        




         



        <div className="flex gap-3 flex-wrap">

  <button
    type="button"
    onClick={addAssignmentRow}
    className="
      bg-green-600
      text-white
      px-4
      py-2
      rounded
    "
  >
    + Add Assignment
  </button>

  <button
    type="button"
    onClick={assignTeacher}
    className="
      bg-black
      text-white
      px-5
      py-2
      rounded
    "
  >
    {
      editingId
        ? "Update Assignments"
        : "Assign Teacher"
    }
  </button>

</div>

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
                  bg-yellow-500
                  text-white
                  px-3
                  py-2
                  rounded
                "
            >
              Edit Assignment
            </button>


          </div>

        ))}


      </div>


    </div>
  );
}