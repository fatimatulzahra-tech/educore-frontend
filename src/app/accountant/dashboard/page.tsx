"use client"

import Link from "next/link"

export default function AccountantDashboard(){

return(

<div>

<h1 className="text-4xl font-bold mb-8">

Accountant Dashboard

</h1>

<div className="grid grid-cols-3 gap-6">

<Link href="/accountant/payments">

<div className="bg-white p-6 rounded shadow">

<h2>

Payments

</h2>

</div>

</Link>

<Link href="/accountant/collection">

<div className="bg-white p-6 rounded shadow">

<h2>

Collection

</h2>

</div>

</Link>

<Link href="/accountant/reports">

<div className="bg-white p-6 rounded shadow">

<h2>

Reports

</h2>

</div>

</Link>

</div>

</div>

)

}