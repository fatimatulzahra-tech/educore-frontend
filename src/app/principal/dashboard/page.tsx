"use client"

import { useEffect, useState } from "react"
import api from "@/services/api"

export default function PrincipalDashboard() {

  const [stats, setStats] = useState({
    total_students: 0,
    total_classes: 0,
    total_sections: 0,

    present_today: 0,
    absent_today: 0,
    late_today: 0,

    attendance_percentage: 0
  })

  const [loading, setLoading] =
    useState(true)

  useEffect(() => {
    fetchDashboard()
  }, [])

  const fetchDashboard = async () => {

    try {

      const response =
        await api.get(
          "/dashboard/summary"
        )

      setStats(response.data)

    } catch (error) {

      console.log(
        "Dashboard Error:",
        error
      )

    } finally {

      setLoading(false)

    }
  }

  if (loading) {

    return (

      <div className="p-8">

        Loading Dashboard...

      </div>

    )
  }

  return (

    <div className="p-8">

      <h1 className="text-4xl font-bold mb-8">

        Principal Dashboard

      </h1>

      {/* TOP CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

        <div className="bg-white rounded-xl shadow p-6">

          <h3 className="text-gray-500">
            Students
          </h3>

          <p className="text-3xl font-bold mt-2">

            {stats.total_students}

          </p>

        </div>

        <div className="bg-white rounded-xl shadow p-6">

          <h3 className="text-gray-500">
            Classes
          </h3>

          <p className="text-3xl font-bold mt-2">

            {stats.total_classes}

          </p>

        </div>

        <div className="bg-white rounded-xl shadow p-6">

          <h3 className="text-gray-500">
            Sections
          </h3>

          <p className="text-3xl font-bold mt-2">

            {stats.total_sections}

          </p>

        </div>

        <div className="bg-white rounded-xl shadow p-6">

          <h3 className="text-gray-500">
            Attendance %
          </h3>

          <p className="text-3xl font-bold mt-2">

            {stats.attendance_percentage}%

          </p>

        </div>

      </div>

      {/* ATTENDANCE CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-white rounded-xl shadow p-6">

          <h3 className="text-gray-500">
            Present Today
          </h3>

          <p className="text-3xl font-bold mt-2">

            {stats.present_today}

          </p>

        </div>

        <div className="bg-white rounded-xl shadow p-6">

          <h3 className="text-gray-500">
            Absent Today
          </h3>

          <p className="text-3xl font-bold mt-2">

            {stats.absent_today}

          </p>

        </div>

        <div className="bg-white rounded-xl shadow p-6">

          <h3 className="text-gray-500">
            Late Today
          </h3>

          <p className="text-3xl font-bold mt-2">

            {stats.late_today}

          </p>

        </div>

      </div>

    </div>
  )
}