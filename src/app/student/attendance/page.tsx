"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";

export default function StudentAttendancePage() {
  const [summary, setSummary] = useState<any>(null);
  const [monthly, setMonthly] = useState<any[]>([]);
  const [yearly, setYearly] = useState<any[]>([]);
  const [history, setHistory] = useState<any[]>([]);

  const currentDate = new Date();

  const currentMonth = currentDate.getMonth() + 1;

  const currentYear = currentDate.getFullYear();

  useEffect(() => {
    loadAttendance();
  }, []);

  const loadAttendance = async () => {
    try {
      const [
        summaryRes,
        monthlyRes,
        yearlyRes,
        historyRes,
      ] = await Promise.all([
        api.get("/attendance/my-summary"),

        api.get("/attendance/my-monthly", {
          params: {
            month: currentMonth,
            year: currentYear,
          },
        }),

        api.get("/attendance/my-yearly", {
          params: {
            year: currentYear,
          },
        }),

        api.get("/attendance/my"),
      ]);

      setSummary(summaryRes.data);

      setMonthly(monthlyRes.data || []);

      setYearly(yearlyRes.data || []);

      setHistory(historyRes.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const countStatus = (
    data: any[],
    status: string
  ) => {
    return data.filter(
      (item) => item.status === status
    ).length;
  };

  return (
    <div className="p-4 md:p-6">

      <h1 className="
        text-2xl
        md:text-3xl
        font-bold
        mb-6
      ">
        My Attendance
      </h1>


      {/* SUMMARY */}

      <div className="
        bg-white
        p-4
        md:p-6
        rounded-xl
        shadow
        mb-6
      ">

        <h2 className="
          text-lg
          md:text-xl
          font-bold
          mb-4
        ">
          Attendance Summary
        </h2>

        {summary && (
          <div className="
            grid
            grid-cols-2
            sm:grid-cols-3
            md:grid-cols-5
            gap-4
          ">

            <div>
              <p className="text-gray-500">
                Present
              </p>

              <p className="text-2xl font-bold">
                {summary.present}
              </p>
            </div>


            <div>
              <p className="text-gray-500">
                Absent
              </p>

              <p className="text-2xl font-bold">
                {summary.absent}
              </p>
            </div>


            <div>
              <p className="text-gray-500">
                Late
              </p>

              <p className="text-2xl font-bold">
                {summary.late}
              </p>
            </div>


            <div>
              <p className="text-gray-500">
                Leave
              </p>

              <p className="text-2xl font-bold">
                {summary.leave}
              </p>
            </div>


            <div>
              <p className="text-gray-500">
                Attendance %
              </p>

              <p className="text-2xl font-bold">
                {summary.attendance_percentage}%
              </p>
            </div>

          </div>
        )}

      </div>




      {/* MONTHLY + YEARLY */}

      <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        gap-6
        mb-6
      ">


        <div className="
          bg-white
          p-4
          md:p-6
          rounded-xl
          shadow
        ">

          <h2 className="text-xl font-bold mb-4">
            This Month
          </h2>


          <div className="space-y-2">

            <p>
              Present: {countStatus(monthly,"present")}
            </p>

            <p>
              Absent: {countStatus(monthly,"absent")}
            </p>

            <p>
              Late: {countStatus(monthly,"late")}
            </p>

            <p>
              Leave: {countStatus(monthly,"leave")}
            </p>

            <p className="font-bold">
              Total: {monthly.length}
            </p>

          </div>


        </div>



        <div className="
          bg-white
          p-4
          md:p-6
          rounded-xl
          shadow
        ">


          <h2 className="text-xl font-bold mb-4">
            This Year
          </h2>


          <div className="space-y-2">

            <p>
              Present: {countStatus(yearly,"present")}
            </p>

            <p>
              Absent: {countStatus(yearly,"absent")}
            </p>

            <p>
              Late: {countStatus(yearly,"late")}
            </p>

            <p>
              Leave: {countStatus(yearly,"leave")}
            </p>

            <p className="font-bold">
              Total: {yearly.length}
            </p>

          </div>


        </div>


      </div>





      {/* ATTENDANCE HISTORY */}

      <div className="
        bg-white
        p-4
        md:p-6
        rounded-xl
        shadow
      ">


        <h2 className="text-xl font-bold mb-4">
          Attendance History
        </h2>


        {history.length === 0 ? (

          <p className="text-gray-500">
            No attendance records found
          </p>

        ) : (

          <div className="space-y-3">


            {history.map((record) => (

              <div
                key={record.id}
                className="
                  border
                  rounded
                  p-4
                "
              >

                <div className="
                  flex
                  flex-col
                  sm:flex-row
                  sm:justify-between
                  gap-2
                ">


                  <div>

                    <p className="font-bold">
                      {record.date}
                    </p>

                  </div>


                  <div>

                    <span className="font-semibold">
                      {record.status}
                    </span>

                  </div>


                </div>


                {record.remarks && (

                  <p className="
                    text-sm
                    text-gray-500
                    mt-2
                  ">
                    {record.remarks}
                  </p>

                )}


              </div>

            ))}


          </div>

        )}


      </div>


    </div>
  );
}