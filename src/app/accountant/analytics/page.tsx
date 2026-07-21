"use client"

import {

useEffect,

useState

} from "react"

import api from "@/services/api"

export default function Analytics(){

const [data,setData]=useState<any>()

useEffect(()=>{

load()

},[])

const load=async()=>{

const res=

await api.get(

"/payments/collection"

)

setData(res.data)

}

return(

<div>

<h1 className="text-3xl font-bold">

Finance Analytics

</h1>

<div className="bg-white p-6 rounded shadow mt-6">

<h2>

Collection

</h2>

<h1>

{data?.total_collection}

</h1>

</div>

<div className="bg-white p-6 rounded shadow mt-6">

<h2>

Transactions

</h2>

<h1>

{data?.total_transactions}

</h1>

</div>

</div>

)

}