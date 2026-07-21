"use client"

import {

useEffect,

useState

} from "react"

import api from "@/services/api"

export default function Attendance(){

const [data,setData]=useState([])

useEffect(()=>{

load()

},[])

const load=async()=>{

const res=

await api.get(

"/attendance"

)

setData(res.data.data)

}

return(

<div>

<h1>

Attendance Records

</h1>

{

data.map(

(item:any)=>(

<div

key={item.id}

className="bg-white p-4 rounded shadow mb-4"

>

Enrollment:

{item.enrollment_id}

<br/>

Date:

{item.date}

<br/>

Status:

{item.status}

</div>

)

)

}

</div>

)

}