"use client"

import { useEffect, useState } from "react"

import api from "@/services/api"

import ProtectedRoute from "@/components/ProtectedRoute"

interface School {
  id: number
  name: string
  slug: string
  principal_id?: number | null
}

export default function PrincipalsPage() {

  const [schools, setSchools] =
    useState<School[]>([])

  const [email, setEmail] =
    useState("")

  const [schoolId, setSchoolId] =
    useState("")

  const [invitationToken, setInvitationToken] =
    useState("")

  const [loading, setLoading] =
    useState(false)

  const [fetching, setFetching] =
    useState(true)

  // -------------------------
  // FETCH SCHOOLS
  // -------------------------

  const fetchSchools = async () => {

    try {

      const response =
        await api.get(
          "/platform/schools"
        )

      let data = []

      if (
        Array.isArray(
          response.data
        )
      ) {

        data = response.data

      } else if (
        Array.isArray(
          response.data?.data
        )
      ) {

        data = response.data.data
      }

      setSchools(data)

    } catch (error) {

      console.log(
        "Failed to fetch schools"
      )

      setSchools([])

    } finally {

      setFetching(false)

    }
  }

  useEffect(() => {

    fetchSchools()

  }, [])

  // -------------------------
  // INVITE PRINCIPAL
  // -------------------------

  const invitePrincipal = async () => {

    if (!email || !schoolId) {

      alert(
        "Please fill all fields"
      )

      return
    }

    try {

      setLoading(true)

      const response =
        await api.post(

          "/platform/invite-principal",

          {
            email: email.trim(),
            school_id: Number(
              schoolId
            )
          }
        )

      setInvitationToken(
        response.data.invitation_token
      )

      alert(
        "Principal invited successfully"
      )

      setEmail("")
      setSchoolId("")

    } catch (error: any) {

      console.log(error)

      alert(

        error?.response?.data?.message ||

        "Invitation failed"
      )

    } finally {

      setLoading(false)

    }
  }

  return (

    <ProtectedRoute
      allowedRoles={["platform_admin"]}
    >

      <div className="p-8">

        {/* PAGE HEADER */}

        <div className="mb-10">

          <h1 className="text-4xl font-bold">

            Principal Management

          </h1>

          <p className="text-gray-500 mt-2">

            Invite and assign principals to schools

          </p>

        </div>


        {/* INVITATION FORM */}

        <div className="bg-white border rounded-xl p-6 max-w-2xl mb-10">

          <h2 className="text-2xl font-semibold mb-6">

            Send Principal Invitation

          </h2>

          <div className="space-y-5">

            {/* EMAIL */}

            <div>

              <label className="block mb-2 font-semibold">

                Principal Email

              </label>

              <input

                type="email"

                placeholder="principal@school.com"

                className="border p-3 rounded w-full"

                value={email}

                onChange={(e) =>

                  setEmail(
                    e.target.value
                  )
                }
              />

            </div>


            {/* SCHOOL SELECT */}

            <div>

              <label className="block mb-2 font-semibold">

                Assign School

              </label>

              <select

                className="border p-3 rounded w-full"

                value={schoolId}

                onChange={(e) =>

                  setSchoolId(
                    e.target.value
                  )
                }
              >

                <option value="">
                  Select School
                </option>

                {
                  schools.map((school) => (

                    <option
                      key={school.id}
                      value={school.id}
                    >

                      {school.name}

                    </option>

                  ))
                }

              </select>

            </div>


            {/* BUTTON */}

            <button

              onClick={invitePrincipal}

              disabled={loading}

              className="bg-black text-white px-5 py-3 rounded w-full"

            >

              {
                loading
                  ? "Sending Invitation..."
                  : "Send Invitation"
              }

            </button>

          </div>

        </div>


        {/* TOKEN DISPLAY */}

        {
          invitationToken && (

            <div className="bg-white border rounded-xl p-6 mb-10">

              <h2 className="text-2xl font-bold mb-4">

                Invitation Token

              </h2>

              <p className="text-sm text-gray-500 mb-3">

                Use this token in the invitation acceptance endpoint.

              </p>

              <div className="bg-gray-100 p-4 rounded break-all text-sm">

                {invitationToken}

              </div>

            </div>
          )
        }


        {/* SCHOOLS STATUS */}

        <div>

          <div className="flex items-center justify-between mb-6">

            <h2 className="text-3xl font-bold">

              Schools Principal Status

            </h2>

            <div className="text-gray-500">

              Total Schools:
              {" "}
              {schools.length}

            </div>

          </div>


          {
            fetching
              ? (

                <p>
                  Loading schools...
                </p>

              ) : schools.length === 0 ? (

                <div className="bg-white border rounded-xl p-10 text-center text-gray-500">

                  No schools available

                </div>

              ) : (

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                  {
                    schools.map((school) => (

                      <div
                        key={school.id}
                        className="bg-white border rounded-xl p-6"
                      >

                        <div className="mb-4">

                          <h3 className="text-2xl font-bold">

                            {school.name}

                          </h3>

                          <p className="text-gray-500">

                            {school.slug}

                          </p>

                        </div>


                        <div className="mb-6">

                          <span className="font-semibold">

                            Principal Status:

                          </span>

                          {" "}

                          {
                            school.principal_id

                              ? (

                                <span className="text-green-600 font-semibold">

                                  Assigned

                                </span>

                              )

                              : (

                                <span className="text-red-500 font-semibold">

                                  Not Assigned

                                </span>

                              )
                          }

                        </div>


                        {/* ACTIONS */}

                        

                      </div>

                    ))
                  }

                </div>

              )
          }

        </div>

      </div>

    </ProtectedRoute>
  )
}