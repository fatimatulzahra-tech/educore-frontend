"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import api from "@/services/api";

export default function TeacherClass({
  params,
}: {
  params: Promise<{
    classId: string;
    sectionId: string;
  }>;
}) {

  const { classId, sectionId } = use(params);

  const [classInfo, setClassInfo] = useState<any>(null);



  useEffect(() => {
    loadClass();
  }, []);



  const loadClass = async () => {

    try {

      const res = await api.get(
        "/teacher-assignments/my-classes"
      );


      const current = res.data.find(
        (item: any) =>
          item.class_id == Number(classId) &&
          item.section_id == Number(sectionId)
      );


      setClassInfo(current);


    } catch (err) {

      console.log(err);

    }

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
      ">

        {classInfo
          ? `${classInfo.class_name} - Section ${classInfo.section_name}`
          : "Teacher Class"}

      </h1>



      <p className="
        text-gray-500
        mt-2
        mb-6
        md:mb-8
      ">
        {classInfo?.subject}
      </p>




      <div className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-4
        gap-5
        md:gap-6
      ">



        <Link
          href={`/teacher/classes/${classId}/${sectionId}/students`}
        >

          <div className="
            bg-white
            rounded-xl
            shadow
            p-5
            md:p-6
            hover:shadow-lg
            transition
            cursor-pointer
            h-full
          ">

            <h2 className="
              text-lg
              md:text-xl
              font-semibold
            ">
              Students
            </h2>


            <p className="
              text-gray-500
              mt-2
            ">
              View class students
            </p>


          </div>


        </Link>




        <Link
          href={`/teacher/classes/${classId}/${sectionId}/attendance`}
        >

          <div className="
            bg-white
            rounded-xl
            shadow
            p-5
            md:p-6
            hover:shadow-lg
            transition
            cursor-pointer
            h-full
          ">


            <h2 className="
              text-lg
              md:text-xl
              font-semibold
            ">
              Attendance
            </h2>


            <p className="
              text-gray-500
              mt-2
            ">
              Mark daily attendance
            </p>


          </div>


        </Link>




        <Link
          href={`/teacher/classes/${classId}/${sectionId}/exams`}
        >

          <div className="
            bg-white
            rounded-xl
            shadow
            p-5
            md:p-6
            hover:shadow-lg
            transition
            cursor-pointer
            h-full
          ">


            <h2 className="
              text-lg
              md:text-xl
              font-semibold
            ">
              Exams
            </h2>


            <p className="
              text-gray-500
              mt-2
            ">
              Manage exams
            </p>


          </div>


        </Link>




        <Link
          href={`/teacher/classes/${classId}/${sectionId}/results`}
        >

          <div className="
            bg-white
            rounded-xl
            shadow
            p-5
            md:p-6
            hover:shadow-lg
            transition
            cursor-pointer
            h-full
          ">


            <h2 className="
              text-lg
              md:text-xl
              font-semibold
            ">
              Results
            </h2>


            <p className="
              text-gray-500
              mt-2
            ">
              Enter and view results
            </p>


          </div>


        </Link>



      </div>


    </div>

  );
}