"use client"

import { useEffect, useState } from "react"
import api from "@/services/api"

export default function StudentDashboard() {

  const [attendance, setAttendance] = useState([])
  const [results, setResults] = useState([])
  const feeRecords = "Premium";

  useEffect(() => {
    load()
  }, [])

  const load = async () => {
    try {

      const att = await api.get("/attendance/my-summary")
      setAttendance(att.data.data || [])

      const res = await api.get("/exams/student/me")
      setResults(res.data || [])

      // const pay = await api.get("/payments/student/me")
      // setFees(pay.data || [])

    } catch (err) {
      console.log(err)
    }
  }

  return (

    <div className="p-4 md:p-8">


      <h1 className="
        text-3xl
        md:text-4xl
        font-bold
        mb-6
        md:mb-8
      ">
        Student Dashboard
      </h1>




      <div className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        gap-5
        md:gap-6
      ">


        <div className="
          bg-white
          p-5
          rounded
          shadow
        ">

          <h2 className="text-gray-600">
            Attendance Records
          </h2>

          <h1 className="
            text-3xl
            font-bold
            mt-2
          ">
            {attendance.length}
          </h1>

        </div>




        <div className="
          bg-white
          p-5
          rounded
          shadow
        ">

          <h2 className="text-gray-600">
            Results
          </h2>

          <h1 className="
            text-3xl
            font-bold
            mt-2
          ">
            {results.length}
          </h1>

        </div>




        <div className="
          bg-white
          p-5
          rounded
          shadow
        ">

          <h2 className="text-gray-600">
            Fee Records
          </h2>

          <h1 className="
            text-3xl
            font-bold
            mt-2
          ">
            {feeRecords}
          </h1>

        </div>


      </div>


    </div>

  )
}