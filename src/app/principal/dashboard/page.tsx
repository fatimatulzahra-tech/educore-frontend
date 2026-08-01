"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";

export default function PrincipalDashboard() {
  /* ============================
      DASHBOARD STATES
  ============================ */

  const [overview, setOverview] = useState({
    students: 0,

    teachers: 0,

    staff: 0,

    classes: 0,

    sections: 0,
  });
  const [studentAttendance, setStudentAttendance] = useState<any[]>([]);

  const [teacherAttendance, setTeacherAttendance] = useState<any[]>([]);

  const [staffAttendance, setStaffAttendance] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  const [finance, setFinance] = useState({
    today_income: 0,

    today_expense: 0,

    balance: 0,
  });

  const [feeSummary, setFeeSummary] = useState({
    expected: 0,

    collected: 0,

    pending: 0,
  });

  const [salarySummary, setSalarySummary] = useState({
    monthly: 0,

    paid: 0,

    pending: 0,
  });

  const [dailyRecovery, setDailyRecovery] = useState<any[]>([]);
  /* ============================
      FETCH DASHBOARD DATA
  ============================ */

  const fetchDashboard = async () => {
    try {
      const res = await api.get("/dashboard/principal");

      setOverview(res.data.overview || {});

      setStudentAttendance(res.data.student_attendance || []);

      setTeacherAttendance(res.data.teacher_attendance || []);

      setStaffAttendance(res.data.staff_attendance || []);

      setFinance(res.data.finance || {});

      setFeeSummary(res.data.fees || {});

      setSalarySummary(res.data.salary || {});

      setDailyRecovery(res.data.recovery || []);
    } catch (err) {
      console.log("Dashboard Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  /* ============================
      LOADING
  ============================ */

  if (loading) {
    return <div className="p-4 sm:p-8">Loading Dashboard...</div>;
  }

  return (
    <div className="p-4 sm:p-8">
      <h1
        className="
      text-2xl
      sm:text-4xl
      font-bold
      mb-8
      "
      >
        Principal Dashboard
      </h1>

      {/* ============================
          SCHOOL OVERVIEW
      ============================ */}

      <div
        className="
grid
grid-cols-1
sm:grid-cols-2
lg:grid-cols-5
gap-4
mb-8
"
      >
        <div className="bg-white rounded-xl shadow p-5">
          <h3 className="text-gray-500">Students</h3>

          <p className="text-3xl font-bold mt-2">{overview.students}</p>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <h3 className="text-gray-500">Teachers</h3>

          <p className="text-3xl font-bold mt-2">{overview.teachers}</p>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <h3 className="text-gray-500">Non Teaching Staff</h3>

          <p className="text-3xl font-bold mt-2">{overview.staff}</p>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <h3 className="text-gray-500">Classes</h3>

          <p className="text-3xl font-bold mt-2">{overview.classes}</p>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <h3 className="text-gray-500">Sections</h3>

          <p className="text-3xl font-bold mt-2">{overview.sections}</p>
        </div>
      </div>

      {/* ============================
    ATTENDANCE SECTION
============================ */}

      <h2
        className="
text-xl
sm:text-2xl
font-bold
mb-5
"
      >
        Attendance Today
      </h2>

      {/* STUDENT ATTENDANCE */}

      <div
        className="
bg-white
rounded-xl
shadow
p-5
mb-6
"
      >
        <h3
          className="
font-bold
text-lg
mb-4
"
        >
          Student Attendance
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b">
              <tr>
                <th className="text-left p-3">Class</th>

                <th className="text-left p-3">Section</th>

                <th className="text-center p-3">Students</th>

                <th className="text-center p-3">Present</th>

                <th className="text-center p-3">Absent</th>

                <th className="text-center p-3">%</th>
              </tr>
            </thead>

            <tbody>
              {studentAttendance.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="
text-center
py-6
text-gray-500
"
                  >
                    No attendance data available
                  </td>
                </tr>
              ) : (
                studentAttendance.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-3">{item.class_name}</td>

                    <td className="p-3">{item.section_name}</td>

                    <td className="p-3 text-center">{item.total_students}</td>

                    <td className="p-3 text-center">{item.present}</td>

                    <td className="p-3 text-center">{item.absent}</td>

                    <td className="p-3 text-center">{item.percentage}%</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* TEACHER ATTENDANCE */}

      <div
        className="
bg-white
rounded-xl
shadow
p-5
mb-6
"
      >
        <h3
          className="
font-bold
text-lg
mb-4
"
        >
          Teaching Staff Attendance
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b">
              <tr>
                <th className="text-left p-3">Teacher</th>

                <th className="text-left p-3">Assigned Classes</th>

                <th className="text-center p-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {teacherAttendance.length === 0 ? (
                <tr>
                  <td
                    colSpan={3}
                    className="
text-center
py-6
text-gray-500
"
                  >
                    No teacher attendance data
                  </td>
                </tr>
              ) : (
                teacherAttendance.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-3">{item.teacher_name}</td>

                    <td className="p-3">{item.assigned_classes?.join(", ")}</td>

                    <td className="p-3 text-center">{item.status}</td>
                  </tr>
                ))
              )}
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
p-5
mb-8
"
      >
        <h3
          className="
font-bold
text-lg
mb-4
"
        >
          Non Teaching Staff Attendance
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b">
              <tr>
                <th className="text-left p-3">Name</th>

                <th className="text-left p-3">Designation</th>

                <th className="text-center p-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {staffAttendance.length === 0 ? (
                <tr>
                  <td
                    colSpan={3}
                    className="
text-center
py-6
text-gray-500
"
                  >
                    No staff attendance data
                  </td>
                </tr>
              ) : (
                staffAttendance.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-3">{item.name}</td>

                    <td className="p-3">{item.designation}</td>

                    <td className="p-3 text-center">{item.status}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ============================
    FINANCE SECTION
============================ */}

      <h2
        className="
text-xl
sm:text-2xl
font-bold
mb-5
"
      >
        Finance Overview
      </h2>

      {/* DAILY INCOME EXPENSE */}

      <div
        className="
grid
grid-cols-1
sm:grid-cols-3
gap-4
mb-8
"
      >
        <div className="bg-white rounded-xl shadow p-5">
          <h3 className="text-gray-500">Today's Income</h3>

          <p className="text-3xl font-bold mt-2">{finance.today_income}</p>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <h3 className="text-gray-500">Today's Expense</h3>

          <p className="text-3xl font-bold mt-2">{finance.today_expense}</p>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <h3 className="text-gray-500">Balance</h3>

          <p className="text-3xl font-bold mt-2">{finance.balance}</p>
        </div>
      </div>

      {/* FEE COLLECTION */}

      <div
        className="
bg-white
rounded-xl
shadow
p-5
mb-6
"
      >
        <h3
          className="
font-bold
text-lg
mb-4
"
        >
          Fee Collection
        </h3>

        <div
          className="
grid
grid-cols-1
sm:grid-cols-3
gap-4
"
        >
          <div>
            <p className="text-gray-500">Expected Fees</p>

            <p className="text-2xl font-bold">{feeSummary.expected}</p>
          </div>

          <div>
            <p className="text-gray-500">Collected</p>

            <p className="text-2xl font-bold">{feeSummary.collected}</p>
          </div>

          <div>
            <p className="text-gray-500">Pending</p>

            <p className="text-2xl font-bold">{feeSummary.pending}</p>
          </div>
        </div>
      </div>

      {/* SALARY SUMMARY */}

      <div
        className="
bg-white
rounded-xl
shadow
p-5
mb-6
"
      >
        <h3
          className="
font-bold
text-lg
mb-4
"
        >
          Salary Overview
        </h3>

        <div
          className="
grid
grid-cols-1
sm:grid-cols-3
gap-4
"
        >
          <div>
            <p className="text-gray-500">Monthly Salary</p>

            <p className="text-2xl font-bold">{salarySummary.monthly}</p>
          </div>

          <div>
            <p className="text-gray-500">Paid Salary</p>

            <p className="text-2xl font-bold">{salarySummary.paid}</p>
          </div>

          <div>
            <p className="text-gray-500">Pending Salary</p>

            <p className="text-2xl font-bold">{salarySummary.pending}</p>
          </div>
        </div>
      </div>

      {/* DAILY RECOVERY */}

      <div
        className="
bg-white
rounded-xl
shadow
p-5
mb-8
"
      >
        <h3
          className="
font-bold
text-lg
mb-4
"
        >
          Daily Recovery
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b">
              <tr>
                <th className="p-3 text-left">Type</th>

                <th className="p-3 text-center">Amount</th>

                <th className="p-3 text-left">Date</th>
              </tr>
            </thead>

            <tbody>
              {dailyRecovery.length === 0 ? (
                <tr>
                  <td
                    colSpan={3}
                    className="
text-center
py-6
text-gray-500
"
                  >
                    No recovery data available
                  </td>
                </tr>
              ) : (
                dailyRecovery.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-3">{item.type}</td>

                    <td className="p-3 text-center">{item.amount}</td>

                    <td className="p-3">{item.date}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
