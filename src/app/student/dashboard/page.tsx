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
<div>

<h1 className="text-4xl font-bold mb-8">
Student Dashboard
</h1>

<div className="grid grid-cols-3 gap-6">

<div className="bg-white p-5 rounded shadow">
<h2>Attendance Records</h2>
<h1>{attendance.length}</h1>
</div>

<div className="bg-white p-5 rounded shadow">
<h2>Results</h2>
<h1>{results.length}</h1>
</div>

<div className="bg-white p-5 rounded shadow">
<h2>Fee Records</h2>
<h1>{feeRecords}</h1>
</div>

</div>

</div>
)
}