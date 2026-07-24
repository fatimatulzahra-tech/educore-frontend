"use client"

import { useEffect, useState } from "react"
import api from "@/services/api"

export default function SectionsPage() {
  const [sections, setSections] = useState<any[]>([])
  const [classes, setClasses] = useState<any[]>([])

  const [name, setName] = useState("")
  const [classId, setClassId] = useState("")
  const [loading, setLoading] = useState(false)

  const fetchClasses = async () => {
    try {
      const res = await api.get("/classes")
      setClasses(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  const fetchSections = async () => {
    try {
      const res = await api.get("/sections")
      setSections(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchClasses()
    fetchSections()
  }, [])

  const createSection = async () => {
    if (!name || !classId) {
      alert("All fields required")
      return
    }

    try {
      setLoading(true)

      await api.post("/sections", {
        name,
        class_id: Number(classId),
      })

      alert("Section created successfully")

      setName("")
      setClassId("")

      fetchSections()
    } catch (err: any) {
      console.log(err)

      alert(
        err?.response?.data?.detail ||
          "Failed to create section"
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-4 sm:p-6">

      <h1 className="text-2xl sm:text-4xl font-bold mb-6 sm:mb-8">
        Sections Management
      </h1>


      {/* CREATE SECTION */}

      <div className="bg-white p-4 sm:p-6 rounded shadow mb-8 sm:mb-10">

        <h2 className="text-xl sm:text-2xl font-bold mb-5">
          Create Section
        </h2>

        <div className="space-y-4">

          <select
            className="border p-2 w-full"
            value={classId}
            onChange={(e) =>
              setClassId(e.target.value)
            }
          >
            <option value="">
              Select Class
            </option>

            {classes.map((cls) => (
              <option key={cls.id} value={cls.id}>
                {cls.name}
              </option>
            ))}
          </select>


          <input
            type="text"
            placeholder="Section Name (A, B, C...)"
            className="border p-2 w-full"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />


          <button
            onClick={createSection}
            disabled={loading}
            className="w-full sm:w-auto bg-black text-white px-5 py-2 rounded"
          >
            {loading ? "Creating..." : "Create Section"}
          </button>

        </div>

      </div>



      {/* LIST */}

      <div className="bg-white p-4 sm:p-6 rounded shadow">

        <h2 className="text-xl sm:text-2xl font-bold mb-5">
          All Sections
        </h2>


        {/* Mobile scroll for table */}

        <div className="overflow-x-auto">

          <table className="w-full min-w-[500px] border">

            <thead>
              <tr className="bg-gray-100">

                <th className="border p-2">
                  ID
                </th>

                <th className="border p-2">
                  Name
                </th>

                <th className="border p-2">
                  Class ID
                </th>

              </tr>
            </thead>


            <tbody>

              {sections.map((s) => (

                <tr key={s.id}>

                  <td className="border p-2">
                    {s.id}
                  </td>

                  <td className="border p-2">
                    {s.name}
                  </td>

                  <td className="border p-2">
                    {s.class_id}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  )
}