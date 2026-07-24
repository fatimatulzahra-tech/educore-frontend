"use client";

import {
  useState,
  useEffect
} from "react";

import api from "@/services/api";


export default function Results({
  params
}: any) {


  const [students, setStudents] = useState([]);

  const [examId, setExamId] = useState("");



  useEffect(() => {

    load();

  }, []);



  const load = async () => {

    const res =
      await api.get(
        "/students/teacher",
        {
          params: {
            class_id: params.classId,
            section_id: params.sectionId
          }
        }
      );


    setStudents(res.data);

  };



  const save = async (
    studentId: number,
    marks: number
  ) => {

    await api.post(
      "/results",
      null,
      {
        params: {
          exam_id: examId,
          student_id: studentId,
          marks
        }
      }
    );

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
      ">
        Results
      </h1>



      <input

        placeholder="Exam ID"

        className="
          border
          rounded-lg
          p-2
          w-full
          max-w-md
          mb-6
        "

        onChange={(e) =>
          setExamId(
            e.target.value
          )
        }

      />



      <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-3
        gap-5
      ">


        {
          students.map(

            (student:any) => (

              <ResultCard

                key={student.id}

                student={student}

                save={save}

              />

            )

          )
        }


      </div>


    </div>

  );

}



function ResultCard({

  student,

  save

}:any){


  const [marks,setMarks] = useState("");



  return (

    <div className="
      bg-white
      rounded-lg
      shadow
      p-5
      space-y-4
    ">


      <h2 className="
        text-lg
        font-semibold
      ">

        {student.first_name}

        {" "}

        {student.last_name}

      </h2>



      <input

        placeholder="Marks"

        className="
          border
          rounded-lg
          p-2
          w-full
        "

        onChange={(e) =>
          setMarks(
            e.target.value
          )
        }

      />



      <button

        onClick={() =>
          save(
            student.id,
            marks
          )
        }

        className="
          bg-black
          text-white
          px-4
          py-2
          rounded-lg
          w-full
        "

      >

        Save

      </button>


    </div>

  );

}