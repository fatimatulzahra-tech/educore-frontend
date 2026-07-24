"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/services/api";

export default function TeacherDashboard() {

  const [classes, setClasses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    load();
  }, []);



  const load = async () => {

    try {

      const res =
        await api.get(
          "/teacher-assignments/my-classes"
        );

      setClasses(res.data);


    } catch {

      setClasses([]);


    } finally {

      setLoading(false);

    }

  };



  if (loading) {

    return (
      <div className="p-4 md:p-8">
        Loading Dashboard...
      </div>
    );

  }



  return (

    <div className="
      p-4
      md:p-8
    ">



      <h1 className="
        text-2xl
        md:text-4xl
        font-bold
        mb-6
        md:mb-8
      ">

        Teacher Dashboard

      </h1>




      {/* SUMMARY */}

      <div className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        gap-5
        md:gap-6
        mb-8
      ">


        <div className="
          bg-white
          rounded-xl
          shadow
          p-5
          md:p-6
        ">

          <h3 className="text-gray-500">

            Assigned Classes

          </h3>


          <p className="
            text-3xl
            font-bold
            mt-2
          ">

            {classes.length}

          </p>


        </div>




        <div className="
          bg-white
          rounded-xl
          shadow
          p-5
          md:p-6
        ">


          <h3 className="text-gray-500">

            Subjects

          </h3>


          <p className="
            text-3xl
            font-bold
            mt-2
          ">


            {
              new Set(
                classes.map(
                  (c) => c.subject
                )
              ).size
            }


          </p>


        </div>





        <div className="
          bg-white
          rounded-xl
          shadow
          p-5
          md:p-6
        ">


          <h3 className="text-gray-500">

            Active Assignments

          </h3>


          <p className="
            text-3xl
            font-bold
            mt-2
          ">


            {classes.length}


          </p>


        </div>


      </div>





      {/* CLASS CARDS */}


      <h2 className="
        text-xl
        md:text-2xl
        font-bold
        mb-4
      ">

        My Classes

      </h2>




      <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        gap-5
        md:gap-6
      ">


        {classes.map((item) => (


          <div

            key={item.id}

            className="
              bg-white
              rounded-xl
              shadow
              p-5
              md:p-6
            "

          >



            <h3 className="
              text-lg
              md:text-xl
              font-bold
              mb-3
            ">

              {item.subject}

            </h3>




            <div className="
              space-y-2
              text-sm
              md:text-base
            ">


              <p>

                <span className="font-medium">
                  Class:
                </span>{" "}

                {item.class_name}

              </p>



              <p>

                <span className="font-medium">
                  Section:
                </span>{" "}

                {item.section_name}

              </p>



              <p>

                <span className="font-medium">
                  Students:
                </span>{" "}

                {item.student_count ?? 0}

              </p>



            </div>




            <Link

              href={`/teacher/classes/${item.class_id}/${item.section_id}`}

            >

              <button

                className="
                  bg-black
                  text-white
                  px-4
                  py-2
                  rounded
                  mt-4
                  w-full
                  sm:w-auto
                "

              >

                Open Class

              </button>


            </Link>




          </div>


        ))}


      </div>



    </div>

  );

}