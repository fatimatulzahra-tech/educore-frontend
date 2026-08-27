"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";

export default function EmployeeAttendancePage() {
  const [teachers, setTeachers] = useState<any[]>([]);
  const [staff, setStaff] = useState<any[]>([]);

  const [attendanceDate, setAttendanceDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [teacherAttendance, setTeacherAttendance] = useState<
    Record<number, string>
  >({});

  const [staffAttendance, setStaffAttendance] = useState<
    Record<number, string>
  >({});

  useEffect(() => {
    fetchTeachers();
    fetchStaff();
  }, []);

  const fetchTeachers = async () => {
    try {
      const res = await api.get("/teachers");
      setTeachers(res.data || []);
    } catch (err) {
      console.log(err);
      setTeachers([]);
    }
  };

  const fetchStaff = async () => {
    try {
      const res = await api.get("/staff");
      setStaff(res.data || []);
    } catch (err) {
      console.log(err);
      setStaff([]);
    }
  };

  const attendanceOptions = [
  "Present",
  "Absent",
  "Late",
  "Leave",
  "Half Day",
];
const saveAttendance = async () => {
  const payload = {
    date: attendanceDate,

    teacher_attendance: teachers.map((teacher) => ({
      teacher_id: teacher.id,
      status: teacherAttendance[teacher.id] || "Present",
    })),

    staff_attendance: staff.map((member) => ({
      staff_id: member.id,
      status: staffAttendance[member.id] || "Present",
    })),
  };

    await api.post("/employee-attendance", payload);

  alert("Attendance saved successfully");
};


return (
  <div className="p-4 md:p-8">

    <h1
      className="
      text-3xl
      md:text-4xl
      font-bold
      mb-8
      "
    >
      Employee Attendance
    </h1>

    {/* DATE */}

    <div
      className="
      bg-white
      rounded-xl
      shadow
      p-6
      mb-8
      "
    >
      <label className="font-semibold block mb-2">
        Attendance Date
      </label>

      <input
        type="date"
        className="
        border
        rounded
        p-2
        w-full
        md:w-72
        "
        value={attendanceDate}
        onChange={(e) =>
          setAttendanceDate(e.target.value)
        }
      />
    </div>

    {/* TEACHERS */}

    <div
      className="
      bg-white
      rounded-xl
      shadow
      p-6
      mb-8
      "
    >
      <h2
        className="
        text-2xl
        font-bold
        mb-5
        "
      >
        Teaching Staff Attendance
      </h2>

      <div className="overflow-x-auto">

        <table className="min-w-full border">

          <thead className="bg-gray-100">

            <tr>

              <th className="border px-4 py-3 text-left">
                Teacher
              </th>

              <th className="border px-4 py-3 text-left">
                Subject
              </th>

              <th className="border px-4 py-3 text-left">
                Assigned Classes
              </th>

              <th className="border px-4 py-3 text-center">
                Attendance
              </th>

            </tr>

          </thead>

          <tbody>

            {teachers.map((teacher) => (

              <tr key={teacher.id}>

                <td className="border px-4 py-3">
                  {teacher.first_name} {teacher.last_name}
                </td>

                <td className="border px-4 py-3">
                  {teacher.subject}
                </td>

                <td className="border px-4 py-3">

                  {
                    teacher.assigned_classes
                    ??
                    "Not Assigned"
                  }

                </td>

                <td className="border px-4 py-3">

                  <select
                    className="
                    border
                    rounded
                    p-2
                    w-full
                    "
                    value={
                      teacherAttendance[teacher.id] ??
                      "Present"
                    }
                    onChange={(e)=>

                      setTeacherAttendance({

                        ...teacherAttendance,

                        [teacher.id]:
                        e.target.value,

                      })

                    }
                  >

                    {attendanceOptions.map((status)=>(

                      <option
                        key={status}
                        value={status}
                      >

                        {status}

                      </option>

                    ))}

                  </select>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

    {/* NON TEACHING STAFF */}

    <div
      className="
      bg-white
      rounded-xl
      shadow
      p-6
      mb-8
      "
    >

      <h2
        className="
        text-2xl
        font-bold
        mb-5
        "
      >
        Non Teaching Staff Attendance
      </h2>

      <div className="overflow-x-auto">

        <table className="min-w-full border">

          <thead className="bg-gray-100">

            <tr>

              <th className="border px-4 py-3 text-left">
                Name
              </th>

              <th className="border px-4 py-3 text-left">
                Designation
              </th>

              <th className="border px-4 py-3 text-left">
                Department
              </th>

              <th className="border px-4 py-3 text-center">
                Attendance
              </th>

            </tr>

          </thead>

          <tbody>

            {staff.map((member)=>(

              <tr key={member.id}>

                <td className="border px-4 py-3">

                  {member.first_name} {member.last_name}

                </td>

                <td className="border px-4 py-3">

                  {member.designation}

                </td>

                <td className="border px-4 py-3">

                  {member.department}

                </td>

                <td className="border px-4 py-3">

                  <select
                    className="
                    border
                    rounded
                    p-2
                    w-full
                    "
                    value={
                      staffAttendance[member.id] ??
                      "Present"
                    }
                    onChange={(e)=>

                      setStaffAttendance({

                        ...staffAttendance,

                        [member.id]:
                        e.target.value,

                      })

                    }
                  >

                    {attendanceOptions.map((status)=>(

                      <option
                        key={status}
                        value={status}
                      >

                        {status}

                      </option>

                    ))}

                  </select>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

    <button
      onClick={saveAttendance}
      className="
      bg-black
      text-white
      px-6
      py-3
      rounded-lg
      "
    >
      Save Attendance
    </button>

  </div>
);}