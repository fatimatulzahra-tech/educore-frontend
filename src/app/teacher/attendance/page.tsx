"use client";

import api from "@/services/api";
import { useEffect, useState } from "react";

interface AttendanceHistory {
  date: string;
  class_id: number;
  section_id: number;
  class_name: string;
  section_name: string;
}

interface AttendanceDetail {
  student_name: string;
  admission_number: string;
  status: string;
}

export default function AttendancePage() {
  const [history, setHistory] = useState<AttendanceHistory[]>([]);

  const [selected, setSelected] = useState<AttendanceHistory | null>(null);

  const [details, setDetails] = useState<AttendanceDetail[]>([]);

  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetchHistory();
  }, []);


  async function fetchHistory() {
    try {
      const res = await api.get("/attendance/teacher-history");

      setHistory(res.data);

    } catch (error) {
      console.error("Failed to load attendance history", error);

    } finally {
      setLoading(false);
    }
  }


  async function viewAttendance(item: AttendanceHistory) {
    setSelected(item);

    try {
      const res = await api.get("/attendance/teacher-history/details", {
        params: {
          class_id: item.class_id,
          section_id: item.section_id,
          date: item.date,
        },
      });

      setDetails(res.data);

    } catch (error) {
      console.error("Failed to load details", error);
    }
  }


  return (
    <div className="p-4 md:p-6">

      <div className="mb-6">

        <h1 className="text-xl md:text-2xl font-semibold">
          Attendance History
        </h1>

        <p className="text-gray-500 mt-1 text-sm md:text-base">
          View previously submitted attendance records
        </p>

      </div>


      {/* History Table */}

      <div className="
        rounded-lg
        border
        bg-white
        overflow-x-auto
      ">

        <table className="w-full min-w-[600px]">

          <thead className="border-b bg-gray-50">

            <tr>

              <th className="p-3 text-left">
                Date
              </th>

              <th className="p-3 text-left">
                Class
              </th>

              <th className="p-3 text-left">
                Section
              </th>

              <th className="p-3 text-center">
                Action
              </th>

            </tr>

          </thead>


          <tbody>

            {loading ? (

              <tr>
                <td colSpan={4} className="p-5 text-center">
                  Loading...
                </td>
              </tr>

            ) : history.length === 0 ? (

              <tr>
                <td colSpan={4} className="p-5 text-center">
                  No attendance records found
                </td>
              </tr>

            ) : (

              history.map((item, index) => (

                <tr
                  key={index}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="p-3">
                    {item.date}
                  </td>


                  <td className="p-3">
                    Grade {item.class_name}
                  </td>


                  <td className="p-3">
                    {item.section_name}
                  </td>


                  <td className="p-3 text-center">

                    <button
                      onClick={() => {
                        if (
                          selected?.date === item.date &&
                          selected?.class_id === item.class_id &&
                          selected?.section_id === item.section_id
                        ) {
                          setSelected(null);
                          setDetails([]);
                        } else {
                          viewAttendance(item);
                        }
                      }}
                      className="
                        rounded
                        bg-blue-600
                        px-4
                        py-1
                        text-white
                        hover:bg-blue-700
                      "
                    >

                      {selected?.date === item.date &&
                      selected?.class_id === item.class_id &&
                      selected?.section_id === item.section_id
                        ? "Close"
                        : "View"}

                    </button>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>



      {/* Details Section */}

      {selected && (

        <div className="
          mt-8
          rounded-lg
          border
          bg-white
          p-4
          md:p-5
        ">

          <div className="mb-5">

            <h2 className="text-lg md:text-xl font-semibold">
              {selected.date}
            </h2>


            <p className="text-gray-600 text-sm md:text-base">

              Grade {selected.class_name}
              {" - "}
              Section {selected.section_name}

            </p>

          </div>



          <div className="overflow-x-auto">

            <table className="w-full min-w-[600px]">

              <thead className="border-b bg-gray-50">

                <tr>

                  <th className="p-3 text-left">
                    Admission No.
                  </th>


                  <th className="p-3 text-left">
                    Student
                  </th>


                  <th className="p-3 text-left">
                    Status
                  </th>

                </tr>

              </thead>


              <tbody>

                {details.map((student, index) => (

                  <tr
                    key={index}
                    className="border-b"
                  >

                    <td className="p-3">
                      {student.admission_number}
                    </td>


                    <td className="p-3">
                      {student.student_name}
                    </td>


                    <td className="p-3">

                      <span
                        className={
                          student.status === "Present"
                            ? "text-green-600"
                            : student.status === "Absent"
                              ? "text-red-600"
                              : "text-yellow-600"
                        }
                      >
                        {student.status}
                      </span>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>


        </div>

      )}

    </div>
  );
}