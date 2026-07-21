"use client"

import {

useEffect,

useState

} from "react"

import api from "@/services/api"

export default function Exams(){

const [exams,setExams]=useState([])

useEffect(()=>{

load()

},[])

const load=async()=>{

const res=

await api.get(

"/exams",

{

params:{

class_id:1,

section_id:1

}

}

)

setExams(res.data)

}

return(

<div>

<h1>

Exams

</h1>

{

exams.map(

(exam:any)=>(

<div

key={exam.id}

className="bg-white p-4 rounded shadow mb-4"

>

<h2>

{exam.title}

</h2>

<p>

{exam.subject}

</p>

</div>

)

)

}

</div>

)

}