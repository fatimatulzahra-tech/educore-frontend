"use client";

import { use, useEffect, useState } from "react";
import api from "@/services/api";

export default function Attendance({
  params,
}: {
  params: Promise<{
    classId: string;
    sectionId: string;
  }>;
}) {
  const { classId, sectionId } = use(params);

  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [attendance, setAttendance] = useState<
    Record<number, string>
  >({});

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      const res = await api.get(
        "/attendance/class-students",
        {
          params: {
            class_id: classId,
            section_id: sectionId,
          },
        }
      );

      setStudents(res.data.students);

      const initial: Record<number, string> = {};

      res.data.students.forEach((student: any) => {
        initial[student.enrollment_id] = "present";
      });

      setAttendance(initial);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const submitAttendance = async () => {
    try {
      for (const student of students) {
        await api.post("/attendance", {
          enrollment_id: student.enrollment_id,
          date,
          status: attendance[student.enrollment_id],
          remarks: null,
        });
      }

      alert("Attendance saved successfully");
    } catch (err) {
      console.log(err);
      alert("Failed to save attendance");
    }
  };

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="p-8">

      <h1 className="text-4xl font-bold mb-8">
        Class Attendance
      </h1>

      <div className="bg-white rounded-xl shadow p-6 mb-6 flex items-center justify-between">

        <div>
          <h2 className="text-xl font-semibold">
            Attendance Date
          </h2>
        </div>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border rounded-lg p-2"
        />

      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <div className="max-h-[500px] overflow-y-auto">

          <table className="w-full">

            <thead className="bg-gray-100 sticky top-0">

              <tr>

                <th className="text-left p-4">
                  Student Name
                </th>

                <th className="text-left p-4">
                  Admission No.
                </th>

                <th className="text-left p-4">
                  Status
                </th>

              </tr>

            </thead>

            <tbody>

              {students.map((student: any) => (

                <tr
                  key={student.enrollment_id}
                  className="border-t"
                >

                  <td className="p-4 font-medium">
                    {student.student_name}
                  </td>

                  <td className="p-4">
                    {student.admission_number}
                  </td>

                  <td className="p-4">

                    <select
                      value={
                        attendance[
                          student.enrollment_id
                        ]
                      }
                      onChange={(e) =>
                        setAttendance((prev) => ({
                          ...prev,
                          [student.enrollment_id]:
                            e.target.value,
                        }))
                      }
                      className="border rounded-lg p-2"
                    >
                      <option value="present">
                        Present
                      </option>

                      <option value="absent">
                        Absent
                      </option>

                      <option value="late">
                        Late
                      </option>

                      <option value="leave">
                        Leave
                      </option>

                    </select>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

      <button
        onClick={submitAttendance}
        className="mt-6 bg-black text-white px-6 py-3 rounded-lg"
      >
        Save Attendance
      </button>

    </div>
  );
}