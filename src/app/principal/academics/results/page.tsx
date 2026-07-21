"use client"

import {

useState,

useEffect

} from "react"

import api from "@/services/api"

export default function Results(){

const [results,setResults]=useState([])

useEffect(()=>{

load()

},[])

const load=async()=>{

const res=

await api.get(

"/results",

{

params:{

exam_id:1

}

}

)

setResults(res.data)

}

return(

<div>

<h1>

Results

</h1>

{

results.map(

(result:any)=>(

<div

key={result.id}

className="bg-white p-4 rounded shadow mb-4"

>

Student:

{result.student_id}

<br/>

Marks:

{result.marks}

</div>

)

)

}

</div>

)

}