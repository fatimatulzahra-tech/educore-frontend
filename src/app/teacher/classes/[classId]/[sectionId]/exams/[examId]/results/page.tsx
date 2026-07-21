"use client"

import {

useState,

useEffect

} from "react"

import api from "@/services/api"

export default function Results({

params

}:any){

const [exam,setExam]=useState(null)

const [students,setStudents]=useState([])

useEffect(()=>{

load()

},[])

const load=async()=>{

const exam=

await api.get(

`/exams/${params.examId}`

)

setExam(exam.data)

const students=

await api.get(

"/students/teacher",

{

params:{

class_id:

exam.data.class_id,

section_id:

exam.data.section_id

}

}

)

setStudents(

students.data

)

}

return(

<div>

<h1>

Enter Results

</h1>

{

students.map(

(student:any)=>(

<StudentResult

key={student.id}

student={student}

examId={params.examId}

/>

)

)

}

</div>

)

}

function StudentResult({

student,

examId

}:any){

const [marks,setMarks]=useState("")

const save=async()=>{

await api.post(

"/results",

null,

{

params:{

exam_id:examId,

student_id:student.id,

marks

}

}

)

alert("Saved")

}

return(

<div className="bg-white p-5 rounded shadow">

<h2>

{student.first_name}

{" "}

{student.last_name}

</h2>

<input

placeholder="Marks"

onChange={(e)=>

setMarks(

e.target.value

)

}

/>

<button

onClick={save}

>

Save

</button>

</div>

)

}