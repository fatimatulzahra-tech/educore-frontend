"use client";

import api from "@/services/api";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";


interface Exam {

  id: number;
  title: string;
  subject: string;
  class_name: string;
  section_name: string;
  total_marks: number;
  subject_id: number;

}


interface Student {

  enrollment_id: number;
  student_id: number;
  student_name: string;
  admission_number: string;

}


export default function MarksPage() {


  const searchParams = useSearchParams();

  const examId = searchParams.get("exam");



  const [exam, setExam] = useState<Exam | null>(null);

  const [students, setStudents] = useState<Student[]>([]);


  const [marks, setMarks] = useState<
    Record<number, string>
  >({});


  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);



  useEffect(() => {

    if (examId) {

      loadData();

    }

  }, [examId]);




  async function loadData() {

    try {

      const [
        examRes,
        studentsRes
      ] = await Promise.all([


        api.get(
          `/exams/teacher/${examId}`
        ),


        api.get(
          `/exams/teacher/${examId}/students`
        )


      ]);


      setExam(
        examRes.data
      );


      setStudents(
        studentsRes.data || []
      );


    } catch(error) {

      console.error(
        "Failed loading data",
        error
      );


    } finally {

      setLoading(false);

    }

  }





  function updateMarks(
    enrollmentId:number,
    value:string
  ){

    setMarks({

      ...marks,

      [enrollmentId]: value

    });

  }





  async function saveMarks(){

    if(!exam){

      return;

    }


    try {


      setSaving(true);



      for(const student of students){


        const obtained =
          marks[student.enrollment_id];



        if(!obtained){

          continue;

        }



        await api.post(
          "/exams/marks",
          {

            enrollment_id:
              student.enrollment_id,


            exam_id:
              exam.id,


            subject_id:
              exam.subject_id,


            obtained_marks:
              Number(obtained),


            total_marks:
              exam.total_marks

          }
        );


      }



      alert(
        "Marks saved successfully"
      );


    } catch(error){

      console.error(error);

      alert(
        "Failed to save marks"
      );


    } finally {

      setSaving(false);

    }


  }





  if(loading){

    return (

      <div className="p-4 md:p-6">

        Loading...

      </div>

    );

  }




  return (

    <div className="
      p-4
      md:p-6
    ">


      {exam && (

        <div className="mb-6 md:mb-8">


          <h1 className="
            text-2xl
            md:text-3xl
            font-bold
          ">

            {exam.title}

          </h1>


          <p className="
            text-gray-500
            mt-2
            text-sm
            md:text-base
          ">

            {exam.subject}
            {" | "}
            Grade {exam.class_name}
            {" - "}
            Section {exam.section_name}

          </p>


          <p className="mt-2">

            Total Marks:
            {" "}
            {exam.total_marks}

          </p>


        </div>

      )}





      <div className="
        bg-white
        rounded-lg
        border
        overflow-x-auto
      ">


        <table className="
          w-full
          min-w-[600px]
        ">


          <thead className="
            bg-gray-50
            border-b
          ">

            <tr>


              <th className="p-3 text-left">

                Admission No.

              </th>


              <th className="p-3 text-left">

                Student

              </th>


              <th className="p-3 text-left">

                Obtained Marks

              </th>


            </tr>


          </thead>



          <tbody>


          {students.map((student)=>(


            <tr
              key={student.enrollment_id}
              className="border-b"
            >


              <td className="p-3">

                {student.admission_number}

              </td>



              <td className="p-3">

                {student.student_name}

              </td>



              <td className="p-3">


                <input

                  type="number"

                  min="0"

                  max={exam?.total_marks}

                  value={
                    marks[
                      student.enrollment_id
                    ] || ""
                  }


                  onChange={(e)=>

                    updateMarks(

                      student.enrollment_id,

                      e.target.value

                    )

                  }


                  className="
                    border
                    rounded
                    px-3
                    py-2
                    w-28
                    md:w-32
                  "

                />


              </td>



            </tr>


          ))}


          </tbody>


        </table>


      </div>





      <button

        onClick={saveMarks}

        disabled={saving}

        className="
          mt-6
          bg-black
          text-white
          px-6
          py-3
          rounded
          w-full
          sm:w-auto
        "

      >

        {saving
          ? "Saving..."
          : "Save Marks"
        }


      </button>



    </div>

  );

}