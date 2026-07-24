"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import api from "@/services/api";

export default function Exams({
  params
}: any) {

  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [marks, setMarks] = useState("");

  const [exams, setExams] = useState<any[]>([]);


  useEffect(() => {

    load();

  }, []);



  const load = async () => {

    const res = await api.get(
      "/exams",
      {
        params: {
          class_id: params.classId,
          section_id: params.sectionId
        }
      }
    );

    setExams(res.data);

  };



  const createExam = async () => {

    await api.post(
      "/exams",
      null,
      {
        params: {
          title,
          class_id: params.classId,
          section_id: params.sectionId,
          subject,
          total_marks: marks
        }
      }
    );

    load();

  };



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
        Exams
      </h1>



      <div className="
        bg-white
        p-4
        md:p-5
        rounded
        shadow
        mb-8
      ">


        <input

          className="
            border
            rounded
            p-2
            w-full
            mb-3
          "

          placeholder="Exam Title"

          onChange={(e) =>
            setTitle(e.target.value)
          }

        />



        <input

          className="
            border
            rounded
            p-2
            w-full
            mb-3
          "

          placeholder="Subject"

          onChange={(e) =>
            setSubject(e.target.value)
          }

        />



        <input

          className="
            border
            rounded
            p-2
            w-full
            mb-3
          "

          placeholder="Total Marks"

          onChange={(e) =>
            setMarks(e.target.value)
          }

        />



        <button

          className="
            bg-black
            text-white
            px-4
            py-2
            rounded
            w-full
            sm:w-auto
          "

          onClick={createExam}

        >

          Create Exam

        </button>


      </div>




      <div className="
        grid
        gap-4
      ">


        {
          exams.map(

            (exam:any) => (

              <div

                key={exam.id}

                className="
                  bg-white
                  p-4
                  md:p-5
                  rounded
                  shadow
                "

              >


                <h2 className="
                  font-bold
                  text-lg
                ">

                  {exam.title}

                </h2>


                <p>
                  {exam.subject}
                </p>


                <p>
                  Total : {exam.total_marks}
                </p>



                <Link

                  href={`/teacher/exams/${exam.id}`}

                >

                  <button

                    className="
                      bg-black
                      text-white
                      px-4
                      py-2
                      rounded
                      mt-3
                      w-full
                      sm:w-auto
                    "

                  >

                    Open Exam

                  </button>


                </Link>


              </div>

            )

          )
        }


      </div>


    </div>

  );

}