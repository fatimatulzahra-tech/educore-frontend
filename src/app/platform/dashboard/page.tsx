"use client";

import { useEffect, useState } from "react";

import api from "@/services/api";


type School = {

  id: number;

  name: string;

  email: string;

  address: string;
};


export default function PlatformDashboard() {

  const [

    schools,

    setSchools

  ] = useState<
    School[]
  >([]);

  const [

    loading,

    setLoading

  ] = useState(
    true
  );


  useEffect(() => {

    fetchSchools();

  }, []);


  const fetchSchools = async () => {

    try {

      setLoading(
        true
      );

      const response =
        await api.get(
          "/platform/schools"
        );

      console.log(

        "API RESPONSE:",

        response.data
      );

      let data:
        School[] = [];

      if (

        Array.isArray(
          response.data
        )

      ) {

        data =
          response.data;

      }

      else if (

        Array.isArray(

          response.data?.data

        )

      ) {

        data =
          response.data.data;

      }

      setSchools(
        data
      );

    }

    catch (error) {

      console.log(

        "Failed to fetch schools:",

        error
      );

      setSchools([]);

    }

    finally {

      setLoading(
        false
      );
    }
  };


  return (

    <div className="p-6">

      <h1 className="text-4xl font-bold mb-8">

        Platform Dashboard

      </h1>


      {/* STATS */}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-10">

        <div className="bg-white p-5 rounded shadow">

          <h2 className="text-gray-500">

            Total Schools

          </h2>

          <p className="text-3xl font-bold">

            {

              loading

              ? "..."

              : schools.length

            }

          </p>

        </div>


        <div className="bg-white p-5 rounded shadow">

          <h2 className="text-gray-500">

            Active Tenants

          </h2>

          <p className="text-3xl font-bold">

            {

              loading

              ? "..."

              : schools.length

            }

          </p>

        </div>


        <div className="bg-white p-5 rounded shadow">

          <h2 className="text-gray-500">

            SaaS Status

          </h2>

          <p className="text-xl font-bold text-green-600">

            Operational

          </p>

        </div>


        <div className="bg-white p-5 rounded shadow">

          <h2 className="text-gray-500">

            Platform Version

          </h2>

          <p className="text-2xl font-bold">

            v1.0

          </p>

        </div>

      </div>


      {/* TABLE */}

      <div className="bg-white p-6 rounded shadow">

        <h2 className="text-2xl font-bold mb-5">

          Registered Schools

        </h2>


        {

          loading

          ? (

            <p className="text-gray-500">

              Loading schools...

            </p>

          )

          : schools.length === 0

          ? (

            <p className="text-gray-500">

              No schools found

            </p>

          )

          : (

            <table className="w-full">

              <thead>

                <tr className="border-b">

                  <th className="text-left py-3">

                    ID

                  </th>

                  <th className="text-left py-3">

                    School

                  </th>

                  <th className="text-left py-3">

                    Email

                  </th>

                  <th className="text-left py-3">

                    Address

                  </th>

                </tr>

              </thead>


              <tbody>

                {

                  schools.map(

                    (school) => (

                    <tr

                      key={school.id}

                      className="border-b"

                    >

                      <td className="py-3">

                        {school.id}

                      </td>

                      <td className="py-3">

                        {school.name}

                      </td>

                      <td className="py-3">

                        {school.email}

                      </td>

                      <td className="py-3">

                        {school.address}

                      </td>

                    </tr>

                  ))

                }

              </tbody>

            </table>

          )

        }

      </div>

    </div>
  );
}