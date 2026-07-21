"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";


interface Result {

  id: number;

  exam: string;

  subject: string;

  obtained_marks: number;

  total_marks: number;

}



export default function StudentResults() {


  const [results, setResults] = useState<Result[]>([]);

  const [loading, setLoading] = useState(true);



  useEffect(() => {

    loadResults();

  }, []);




  async function loadResults() {

    try {


      const res = await api.get(
        "/exams/student/results"
      );


      setResults(
        res.data || []
      );


    } catch(error) {


      console.error(
        "Failed to load results",
        error
      );


    } finally {


      setLoading(false);


    }

  }




  return (

    <div className="p-6">


      <div className="mb-8">

        <h1 className="text-3xl font-bold">

          Results

        </h1>


        <p className="text-gray-500 mt-2">

          View your examination results.

        </p>


      </div>




      {loading ? (

        <div className="bg-white p-6 rounded shadow">

          Loading results...

        </div>



      ) : results.length === 0 ? (


        <div className="bg-white p-6 rounded shadow text-gray-500">

          No results available.

        </div>



      ) : (


        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">


          {results.map((result)=>(


            <div

              key={result.id}

              className="bg-white rounded-xl shadow p-6"

            >


              <h2 className="text-xl font-semibold mb-4">

                {result.exam}

              </h2>



              <div className="space-y-2">


                <p>

                  <strong>
                    Subject:
                  </strong>{" "}

                  {result.subject}

                </p>



                <p>

                  <strong>
                    Marks:
                  </strong>{" "}

                  {result.obtained_marks}

                  {" / "}

                  {result.total_marks}

                </p>



                <p>

                  <strong>
                    Percentage:
                  </strong>{" "}

                  {(
                    (result.obtained_marks /
                    result.total_marks) * 100
                  ).toFixed(2)}

                  %

                </p>



              </div>


            </div>


          ))}


        </div>


      )}



    </div>

  );

}