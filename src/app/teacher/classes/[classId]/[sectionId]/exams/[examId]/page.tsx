"use client"

import Link from "next/link"

export default function ExamPage({

params

}:any){

return(

<div>

<h1 className="text-4xl font-bold">

Exam

</h1>

<div className="grid gap-4 mt-8">

<Link

href={`/teacher/exams/${params.examId}/results`}

>

<div className="bg-white p-5 rounded shadow">

Enter Results

</div>

</Link>

</div>

</div>

)

}