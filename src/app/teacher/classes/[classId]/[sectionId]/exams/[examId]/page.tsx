"use client";

import Link from "next/link";

export default function ExamPage({
  params
}: any) {

  return (

    <div className="
      p-4
      md:p-8
    ">


      <h1 className="
        text-2xl
        md:text-4xl
        font-bold
      ">
        Exam
      </h1>



      <div className="
        grid
        gap-4
        mt-6
        md:mt-8
      ">


        <Link

          href={`/teacher/exams/${params.examId}/results`}

        >

          <div className="
            bg-white
            p-5
            rounded
            shadow
            hover:shadow-md
            transition
            cursor-pointer
          ">

            Enter Results

          </div>


        </Link>


      </div>


    </div>

  );

}