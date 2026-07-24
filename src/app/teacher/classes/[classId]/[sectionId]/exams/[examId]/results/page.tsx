"use client";

import {
  useState,
  useEffect
} from "react";

import api from "@/services/api";


export default function Results({
  params
}: any) {

  const [exam, setExam] = useState(null);

  const [students, setStudents] = useState([]);


  useEffect(() => {

    load();

  }, []);



  const load = async () => {

    const exam =
      await api.get(
        `/exams/${params.examId}`
      );


    setExam(exam.data);


    const students =
      await api.get(
        "/students/teacher",
        {
          params: {
            class_id:
              exam.data.class_id,

            section_id:
              exam.data.section_id
          }
        }
      );


    setStudents(
      students.data
    );

  };



  return (

    <div className="
      p-4
      md:p-8
    ">


      <h1 className="
        text-2xl
        md:text-3xl
        font-bold
        mb-6
      ">
        Enter Results
      </h1>



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

              <StudentResult

                key={student.id}

                student={student}

                examId={params.examId}

              />

            )

          )
        }


      </div>


    </div>

  );

}



function StudentResult({

  student,

  examId

}:any){


  const [marks,setMarks] = useState("");



  const save = async()=>{


    await api.post(

      "/results",

      null,

      {

        params:{

          exam_id:examId,

          student_id:student.id,

          marks

        }

      }

    );


    alert("Saved");


  };



  return (

    <div className="
      bg-white
      p-5
      rounded
      shadow
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
          w-full
          border
          rounded-lg
          p-2
        "

        onChange={(e)=>

          setMarks(

            e.target.value

          )

        }

      />



      <button

        onClick={save}

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