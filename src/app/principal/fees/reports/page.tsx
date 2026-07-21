"use client"

import Link from "next/link"

export default function Reports(){

return(

<div>

<h1 className="text-4xl font-bold mb-8">

Fee Reports

</h1>

<div className="grid gap-4">

<div className="bg-white p-5 rounded shadow">

Daily Collection

</div>

<div className="bg-white p-5 rounded shadow">

Monthly Collection

</div>

<div className="bg-white p-5 rounded shadow">

Student Payments

</div>

<div className="bg-white p-5 rounded shadow">

Pending Fees

</div>

</div>

</div>

)

}