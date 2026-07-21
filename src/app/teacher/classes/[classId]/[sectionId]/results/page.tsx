"use client"

import {useState,useEffect} from "react"

import api from "@/services/api"

export default function Results({

params

}:any){

const [students,setStudents]=useState([])

const [examId,setExamId]=useState("")

useEffect(()=>{

load()

},[])

const load=async()=>{

const res=

await api.get(

"/students/teacher",

{

params:{

class_id:params.classId,

section_id:params.sectionId

}

}

)

setStudents(res.data)

}

const save=async(

studentId:number,

marks:number

)=>{

await api.post(

"/results",

null,

{

params:{

exam_id:examId,

student_id:studentId,

marks

}

}

)

}

return(

<div>

<h1>

Results

</h1>

<input

placeholder="Exam ID"

onChange={(e)=>

setExamId(

e.target.value

)

}

/>

{

students.map(

(student:any)=>(

<ResultCard

key={student.id}

student={student}

save={save}

/>

)

)

}

</div>

)

}

function ResultCard({

student,

save

}:any){

const [marks,setMarks]=useState("")

return(

<div>

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

onClick={()=>

save(

student.id,

marks

)

}

>

Save

</button>

</div>

)

}