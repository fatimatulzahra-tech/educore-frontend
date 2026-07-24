"use client"

import { useEffect, useState } from "react"
import api from "@/services/api"

export default function ClassesPage() {
  const [classes, setClasses] = useState<any[]>([])
  const [sections, setSections] = useState<any[]>([])

  const [name, setName] = useState("")
  const [sectionName, setSectionName] = useState("")

  const [selectedClassId, setSelectedClassId] =
    useState<number | null>(null)

  const [loading, setLoading] = useState(false)

  const fetchClasses = async () => {
    try {
      const res = await api.get("/classes/")
      console.log("Request URL:", res.request?.responseURL)
      console.log("Classes:", res.data)
      setClasses(res.data || [])
    } catch (err) {
      console.log(err)
    }
  }

  const fetchSections = async () => {
    try {
      const res = await api.get("/sections/")
      setSections(res.data || [])
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchClasses()
    fetchSections()
  }, [])

  const createClass = async () => {
    if (!name) {
      return alert("Class name required")
    }

    try {
      setLoading(true)

      await api.post("/classes/", {
        name
      })

      setName("")

      fetchClasses()

    } catch (err) {
      console.log(err)
      alert("Error creating class")

    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-4 sm:p-6">

      <h1 className="text-2xl sm:text-3xl font-bold mb-6">
        Class Management
      </h1>


      <div className="bg-white p-4 shadow rounded mb-6">

        <h2 className="font-bold mb-2">
          Create Class
        </h2>

        <input
          className="border p-2 w-full mb-3"
          placeholder="e.g. 10th, 9th, 1st"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <button
          onClick={createClass}
          disabled={loading}
          className="bg-black text-white px-4 py-2 rounded w-full sm:w-auto"
        >

          {
            loading
              ? "Creating..."
              : "Create Class"
          }

        </button>

      </div>


      <div className="bg-white p-4 shadow rounded mb-6">

        <h2 className="font-bold mb-4">
          Create Section
        </h2>


        <select
          className="border p-2 w-full mb-3"
          onChange={(e) =>
            setSelectedClassId(
              Number(e.target.value)
            )
          }
        >

          <option value="">
            Select Class
          </option>

          {classes.map((cls) => (

            <option
              key={cls.id}
              value={cls.id}
            >

              {cls.name}

            </option>

          ))}

        </select>


        <input
          className="border p-2 w-full mb-3"
          placeholder="Section Name (A, B, Science)"
          value={sectionName}
          onChange={(e) =>
            setSectionName(
              e.target.value
            )
          }
        />


        <button
          className="bg-black text-white px-4 py-2 rounded w-full sm:w-auto"
          onClick={async () => {

            if (
              !selectedClassId ||
              !sectionName
            ) {

              return alert(
                "Class and Section required"
              )
            }

            try {

              await api.post(
                "/sections/",
                {
                  class_id:
                    selectedClassId,

                  name:
                    sectionName
                }
              )

              setSectionName("")

              fetchSections()

            } catch (err) {

              console.log(err)
            }

          }}
        >

          Create Section

        </button>

      </div>


      <div className="bg-white p-4 shadow rounded">

        <h2 className="font-bold mb-4">
          Class Structure
        </h2>


        {classes.length === 0 && (
          <p>
            No classes created yet
          </p>
        )}


        {classes.map((cls) => (

          <div
            key={cls.id}
            className="mb-4 border p-3 rounded"
          >

            <h3 className="font-bold text-base sm:text-lg">

              📚 {cls.name}

            </h3>


            <div className="ml-2 sm:ml-4 mt-2">

              {sections
                .filter(
                  (sec) =>
                    sec.class_id ===
                    cls.id
                )
                .map((sec) => (

                  <div
                    key={sec.id}
                    className="text-gray-700 text-sm sm:text-base"
                  >

                    🧩 {sec.name}

                  </div>

                ))}

            </div>

          </div>

        ))}

      </div>

    </div>
  )
}