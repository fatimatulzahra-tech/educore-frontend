"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";

export default function AttendancePage() {
  const [today, setToday] = useState<any>(null);
  const [monthly, setMonthly] = useState<any>(null);
  const [yearly, setYearly] = useState<any>(null);
  const [classReports, setClassReports] = useState<any[]>([]);
  const [lowAttendance, setLowAttendance] = useState<any[]>([]);

  const currentDate = new Date();

  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const [
        todayRes,
        monthlyRes,
        yearlyRes,
        classRes,
        lowRes,
      ] = await Promise.all([
        api.get("/attendance/today-summary"),

        api.get("/attendance/monthly-report", {
          params: {
            month: currentMonth,
            year: currentYear,
          },
        }),

        api.get("/attendance/yearly-report", {
          params: {
            year: currentYear,
          },
        }),

        api.get("/attendance/class-report"),

        api.get("/attendance/low-attendance-school"),
      ]);

      setToday(todayRes.data);
      setMonthly(monthlyRes.data);
      setYearly(yearlyRes.data);
      setClassReports(classRes.data || []);
      setLowAttendance(lowRes.data || []);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-4 sm:p-6">

      <h1 className="text-2xl sm:text-3xl font-bold mb-6">
        Attendance Dashboard
      </h1>


      <div className="bg-white p-4 sm:p-6 rounded-xl shadow mb-6">

        <h2 className="text-lg sm:text-xl font-bold mb-4">
          Today's Attendance
        </h2>

        {today && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">

            <div>
              <p className="text-gray-500">Present</p>
              <p className="text-xl sm:text-2xl font-bold">
                {today.present}
              </p>
            </div>

            <div>
              <p className="text-gray-500">Absent</p>
              <p className="text-xl sm:text-2xl font-bold">
                {today.absent}
              </p>
            </div>

            <div>
              <p className="text-gray-500">Late</p>
              <p className="text-xl sm:text-2xl font-bold">
                {today.late}
              </p>
            </div>

            <div>
              <p className="text-gray-500">Leave</p>
              <p className="text-xl sm:text-2xl font-bold">
                {today.leave}
              </p>
            </div>

            <div>
              <p className="text-gray-500">
                Attendance %
              </p>
              <p className="text-xl sm:text-2xl font-bold">
                {today.attendance_percentage}%
              </p>
            </div>

          </div>
        )}

      </div>



      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">


        <div className="bg-white p-4 sm:p-6 rounded-xl shadow">

          <h2 className="text-lg sm:text-xl font-bold mb-4">
            Monthly Report
          </h2>

          {monthly && (
            <div className="space-y-2">

              <p>
                Present: {monthly.present}
              </p>

              <p>
                Absent: {monthly.absent}
              </p>

              <p>
                Late: {monthly.late}
              </p>

              <p>
                Leave: {monthly.leave}
              </p>

              <p className="font-bold">
                Attendance: {monthly.attendance_percentage}%
              </p>

            </div>
          )}

        </div>



        <div className="bg-white p-4 sm:p-6 rounded-xl shadow">

          <h2 className="text-lg sm:text-xl font-bold mb-4">
            Yearly Report
          </h2>

          {yearly && (
            <div className="space-y-2">

              <p>
                Present: {yearly.present}
              </p>

              <p>
                Absent: {yearly.absent}
              </p>

              <p>
                Late: {yearly.late}
              </p>

              <p>
                Leave: {yearly.leave}
              </p>

              <p className="font-bold">
                Attendance: {yearly.attendance_percentage}%
              </p>

            </div>
          )}

        </div>

      </div>



      <div className="bg-white p-4 sm:p-6 rounded-xl shadow mb-6">

        <h2 className="text-lg sm:text-xl font-bold mb-4">
          Class Attendance Performance
        </h2>

        {classReports.length === 0 ? (
          <p className="text-gray-500">
            No data available
          </p>
        ) : (
          <div className="space-y-3">

            {classReports.map((item, index) => (

              <div
                key={index}
                className="border rounded p-3 sm:p-4"
              >

                <p className="font-bold">
                  Class {item.class_id}
                  {" - "}
                  Section {item.section_id}
                </p>

                <p>
                  Attendance: {item.attendance_percentage}%
                </p>

              </div>

            ))}

          </div>
        )}

      </div>




      <div className="bg-white p-4 sm:p-6 rounded-xl shadow">

        <h2 className="text-lg sm:text-xl font-bold mb-4">
          Low Attendance Alerts
        </h2>


        {lowAttendance.length === 0 ? (

          <p className="text-gray-500">
            No low attendance students
          </p>

        ) : (

          <div className="space-y-3">

            {lowAttendance.map((student) => (

              <div
                key={student.student_id}
                className="border rounded p-3 sm:p-4"
              >

                <p className="font-bold">
                  {student.student_name}
                </p>

                <p>
                  Attendance: {student.attendance_percentage}%
                </p>

              </div>

            ))}

          </div>

        )}

      </div>


    </div>
  );
}