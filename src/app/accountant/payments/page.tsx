"use client"

import {

useEffect,

useState

} from "react"

import api from "@/services/api"

export default function Payments(){

const [payments,setPayments]=useState([])

useEffect(()=>{

load()

},[])

const load=async()=>{

const res=

await api.get(

"/payments"

)

setPayments(res.data)

}

return(

<div>

<h1 className="text-3xl font-bold mb-8">

Payments

</h1>

{

payments.map(

(payment:any)=>(

<div

key={payment.id}

className="bg-white p-5 rounded shadow mb-4"

>

Student :

{payment.student_id}

<br/>

Amount :

{payment.amount_paid}

</div>

)

)

}

</div>

)

}