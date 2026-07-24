"use client";

import { use, useEffect, useState } from "react";
import api from "@/services/api";

export default function Students({
  params,
}: {
  params: Promise<{
    classId: string;
    sectionId: string;
  }>;
}) {

  const { classId, sectionId } = use(params);

  const [students, setStudents] = useState<any[]>([]);
  const [classInfo, setClassInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    load();
  }, []);



  const load = async () => {

    try {

      const [studentsRes, classesRes] = await Promise.all([

        api.get("/students/teacher", {
          params: {
            class_id: classId,
            section_id: sectionId,
          },
        }),

        api.get("/teacher-assignments/my-classes")

      ]);


      setStudents(studentsRes.data);


      const current = classesRes.data.find(
        (c: any) =>
          c.class_id == Number(classId) &&
          c.section_id == Number(sectionId)
      );


      setClassInfo(current);


    } finally {

      setLoading(false);

    }

  };



  if (loading) {

    return (
      <div className="p-4 md:p-8">
        Loading...
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
      ">
        Students
      </h1>



      <p className="
        text-gray-500
        mt-2
        text-sm
        md:text-base
      ">
        {classInfo?.class_name} - Section {classInfo?.section_name}
      </p>



      <div className="
        bg-white
        rounded-xl
        shadow
        p-5
        md:p-6
        mt-6
        mb-8
      ">


        <h2 className="text-gray-500">
          Total Students
        </h2>


        <p className="
          text-3xl
          md:text-4xl
          font-bold
          mt-2
        ">
          {students.length}
        </p>


      </div>



      {students.length === 0 ? (


        <div className="
          bg-white
          rounded-xl
          shadow
          p-6
          md:p-10
          text-center
        ">


          <h2 className="
            text-lg
            md:text-xl
            font-semibold
          ">
            No students found
          </h2>


          <p className="
            text-gray-500
            mt-2
          ">
            This class currently has no enrolled students.
          </p>


        </div>



      ) : (


        <div className="
          grid
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-3
          gap-5
          md:gap-6
        ">


          {students.map((student: any) => (


            <div

              key={student.id}

              className="
                bg-white
                rounded-xl
                shadow
                p-5
                md:p-6
              "

            >


              <h2 className="
                text-lg
                md:text-xl
                font-bold
              ">

                {student.first_name} {student.last_name}

              </h2>



              <div className="
                mt-4
                space-y-2
                text-sm
                md:text-base
              ">


                <p>

                  <span className="font-medium">
                    Admission No:
                  </span>{" "}

                  {student.admission_number}

                </p>



                <p>

                  <span className="font-medium">
                    Gender:
                  </span>{" "}

                  {student.gender}

                </p>



                <p>

                  <span className="font-medium">
                    Email:
                  </span>{" "}

                  {student.email || "-"}

                </p>



                <p>

                  <span className="font-medium">
                    Phone:
                  </span>{" "}

                  {student.phone || "-"}

                </p>


              </div>


            </div>


          ))}


        </div>


      )}


    </div>

  );
}