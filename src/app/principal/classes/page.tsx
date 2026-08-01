"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";

/* DEFAULT CLASS LIST */

const DEFAULT_CLASSES = [
  "Play Group",
  "Nursery",
  "Prep",

  "Grade 1",
  "Grade 2",
  "Grade 3",
  "Grade 4",
  "Grade 5",
  "Grade 6",
  "Grade 7",
  "Grade 8",
  "Grade 9",
  "Grade 10",
  "Grade 11",
  "Grade 12",
];

export default function ClassesPage() {
  /* DATABASE */

  const [classes, setClasses] = useState<any[]>([]);
  const [sections, setSections] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);

  /* CREATE CLASSES */

  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);

  /* CREATE SECTIONS */

  const [sectionName, setSectionName] = useState("");

  const [selectedSectionClasses, setSelectedSectionClasses] = useState<
    number[]
  >([]);

  /* CREATE SUBJECTS */

  const [subjectName, setSubjectName] = useState("");

  const [selectedSubjectClasses, setSelectedSubjectClasses] = useState<
    number[]
  >([]);

  /* LOADING */

  const [loading, setLoading] = useState(false);

  /* ===========================
      FETCH DATA
     =========================== */

  const fetchClasses = async () => {
    try {
      const res = await api.get("/classes/");

      setClasses(res.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchSections = async () => {
    try {
      const res = await api.get("/sections/");

      setSections(res.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchSubjects = async () => {
    try {
      const res = await api.get("/subjects/");

      setSubjects(res.data || []);
    } catch {
      /*
        Ignore for now.
        Subject module will be added later.
      */
    }
  };

  useEffect(() => {
    fetchClasses();

    fetchSections();

    fetchSubjects();
  }, []);

  /* ===========================
      CHECKBOX HELPERS
     =========================== */

  const toggleDefaultClass = (className: string) => {
    setSelectedClasses((prev) =>
      prev.includes(className)
        ? prev.filter((item) => item !== className)
        : [...prev, className],
    );
  };

  const toggleSectionClass = (classId: number) => {
    setSelectedSectionClasses((prev) =>
      prev.includes(classId)
        ? prev.filter((id) => id !== classId)
        : [...prev, classId],
    );
  };

  const toggleSubjectClass = (classId: number) => {
    setSelectedSubjectClasses((prev) =>
      prev.includes(classId)
        ? prev.filter((id) => id !== classId)
        : [...prev, classId],
    );
  };

  /* ===========================
      BULK CREATE FUNCTIONS
      (Backend in Part 2)
     =========================== */

  const createSelectedClasses = async () => {
    if (selectedClasses.length === 0) {
      return alert("Please select at least one class.");
    }

    try {
      setLoading(true);

      for (const className of selectedClasses) {
        try {
          await api.post("/classes/", {
            name: className,
          });
        } catch {
          /*
          Ignore duplicates.
          Existing classes will simply be skipped.
        */
        }
      }

      alert("Classes created successfully.");

      setSelectedClasses([]);

      fetchClasses();
    } catch (err) {
      console.log(err);

      alert("Unable to create classes.");
    } finally {
      setLoading(false);
    }
  };

  const createSections = async () => {
    if (!sectionName) {
      return alert("Section name required.");
    }

    if (selectedSectionClasses.length === 0) {
      return alert("Please select at least one class.");
    }

    try {
      setLoading(true);

      for (const classId of selectedSectionClasses) {
        try {
          await api.post("/sections/", {
            class_id: classId,

            name: sectionName,
          });
        } catch {
          /*
          Ignore duplicates.
        */
        }
      }

      alert("Sections created successfully.");

      setSectionName("");

      setSelectedSectionClasses([]);

      fetchSections();
    } catch (err) {
      console.log(err);

      alert("Unable to create sections.");
    } finally {
      setLoading(false);
    }
  };

  const createSubjects = async () => {
    if (!subjectName) {
      return alert("Subject name required.");
    }

    if (selectedSubjectClasses.length === 0) {
      return alert("Please select at least one class.");
    }

    try {
      setLoading(true);

      for (const classId of selectedSubjectClasses) {
        try {
          await api.post("/subjects/", {
            class_id: classId,

            name: subjectName,
          });
        } catch {
          /*
          Ignore duplicates.
        */
        }
      }

      alert("Subjects created successfully.");

      setSubjectName("");

      setSelectedSubjectClasses([]);

      fetchSubjects();
    } catch (err) {
      console.log(err);

      alert("Unable to create subjects.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">Class Management</h1>

      {/* ===========================
      CREATE CLASSES
=========================== */}

      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <h2 className="text-2xl font-bold mb-2">Create Classes</h2>

        <p className="text-gray-500 mb-5">
          Select all classes your school offers.
        </p>

        <div className="flex gap-3 mb-4">
          <button
            onClick={() => setSelectedClasses(DEFAULT_CLASSES)}
            className="
        border
        px-4
        py-2
        rounded
        hover:bg-gray-100
      "
          >
            Select All
          </button>

          <button
            onClick={() => setSelectedClasses([])}
            className="
        border
        px-4
        py-2
        rounded
        hover:bg-gray-100
      "
          >
            Clear
          </button>
        </div>

        <div
          className="
      border
      rounded-lg
      p-4
      h-72
      overflow-y-auto
      space-y-3
    "
        >
          {DEFAULT_CLASSES.map((cls) => (
            <label
              key={cls}
              className="
          flex
          items-center
          gap-3
          cursor-pointer
        "
            >
              <input
                type="checkbox"
                checked={selectedClasses.includes(cls)}
                onChange={() => toggleDefaultClass(cls)}
              />

              <span>{cls}</span>
            </label>
          ))}
        </div>

        <button
          disabled={loading || selectedClasses.length === 0}
          onClick={createSelectedClasses}
          className="
      mt-6
      bg-black
      text-white
      px-6
      py-3
      rounded-lg
      w-full
      disabled:opacity-50
    "
        >
          {loading
            ? "Creating..."
            : `Create ${selectedClasses.length} Selected Classes`}
        </button>
      </div>

      {/* ===========================
      CREATE SECTIONS
=========================== */}

      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <h2 className="text-2xl font-bold mb-2">Create Sections</h2>

        <p className="text-gray-500 mb-5">
          Create one section for multiple classes.
        </p>

        <input
          className="
      border
      rounded-lg
      p-3
      w-full
      mb-5
    "
          placeholder="
      Section Name
      (A, B, Red, Blue...)
    "
          value={sectionName}
          onChange={(e) => setSectionName(e.target.value)}
        />

        <h3 className="font-semibold mb-3">Apply To Classes</h3>

        <div
          className="
      border
      rounded-lg
      p-4
      h-60
      overflow-y-auto
      space-y-3
    "
        >
          {classes.map((cls) => (
            <label
              key={cls.id}
              className="
          flex
          items-center
          gap-3
          cursor-pointer
        "
            >
              <input
                type="checkbox"
                checked={selectedSectionClasses.includes(cls.id)}
                onChange={() => toggleSectionClass(cls.id)}
              />

              <span>{cls.name}</span>
            </label>
          ))}
        </div>
        <button
          onClick={createSections}
          disabled={
            loading || !sectionName || selectedSectionClasses.length === 0
          }
          className="
    mt-6
    bg-black
    text-white
    px-6
    py-3
    rounded-lg
    w-full
    disabled:opacity-50
  "
        >
          {loading
            ? "Creating..."
            : `Create Section "${sectionName || "A"}" for ${selectedSectionClasses.length} Classes`}
        </button>

        {/* ===========================
      CREATE SUBJECTS
=========================== */}

        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <h2 className="text-2xl font-bold mb-2">Create Subjects</h2>

          <p className="text-gray-500 mb-5">
            Create one subject for multiple classes.
          </p>

          <input
            className="
      border
      rounded-lg
      p-3
      w-full
      mb-5
    "
            placeholder="
      Subject Name
      (English, Mathematics...)
    "
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
          />

          <h3 className="font-semibold mb-3">Apply To Classes</h3>

          <div
            className="
      border
      rounded-lg
      p-4
      h-60
      overflow-y-auto
      space-y-3
    "
          >
            {classes.map((cls) => (
              <label
                key={cls.id}
                className="
          flex
          items-center
          gap-3
          cursor-pointer
        "
              >
                <input
                  type="checkbox"
                  checked={selectedSubjectClasses.includes(cls.id)}
                  onChange={() => toggleSubjectClass(cls.id)}
                />

                <span>{cls.name}</span>
              </label>
            ))}
          </div>

          <button
            onClick={createSubjects}
            disabled={
              loading || !subjectName || selectedSubjectClasses.length === 0
            }
            className="
      mt-6
      bg-black
      text-white
      px-6
      py-3
      rounded-lg
      w-full
      disabled:opacity-50
    "
          >
            {loading
              ? "Creating..."
              : `Create Subject "${subjectName || "English"}" for ${selectedSubjectClasses.length} Classes`}
          </button>
        </div>
      </div>

      {/* ================= SCHOOL STRUCTURE ================= */}

      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold">School Structure</h2>

            <p className="text-gray-500 text-sm">
              Overview of all classes, sections and academic setup.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-3 text-left">Class</th>

                <th className="border px-4 py-3 text-center">Sections</th>

                <th className="border px-4 py-3 text-center">Subjects</th>

                {/* <th className="border px-4 py-3 text-left">Class Teacher</th> */}

                <th className="border px-4 py-3 text-center">Students</th>

                {/* <th className="border px-4 py-3 text-center">Actions</th> */}
              </tr>
            </thead>

            <tbody>
              {sections.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-gray-500">
                    No sections created yet.
                  </td>
                </tr>
              ) : (
                sections.map((section) => {
                  const cls = classes.find((c) => c.id === section.class_id);

                  return (
                    <tr key={section.id} className="hover:bg-gray-50">
                      {/* CLASS */}

                      <td className="border px-4 py-4">
                        <div className="font-semibold">{cls?.name}</div>

                        <div className="text-sm text-gray-500">
                          Section {section.name}
                        </div>
                      </td>

                      {/* SECTION */}

                      <td className="border px-4 py-4 text-center">
                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                          {section.name}
                        </span>
                      </td>

                      {/* SUBJECTS */}

                      <td className="border px-4 py-4">
                        <div className="flex flex-wrap gap-2 justify-center">
                          {subjects
                            .filter(
                              (subject) =>
                                subject.class_id === section.class_id,
                            )
                            .map((subject) => (
                              <span
                                key={subject.id}
                                className="
            bg-green-100
            text-green-700
            px-3
            py-1
            rounded-full
            text-sm
          "
                              >
                                {subject.name}
                              </span>
                            ))}

                          {subjects.filter(
                            (subject) => subject.class_id === section.class_id,
                          ).length === 0 && (
                            <span className="text-gray-400 text-sm">
                              No Subjects
                            </span>
                          )}
                        </div>
                      </td>

                      {/* CLASS TEACHER */}

                      {/* <td className="border px-4 py-4">
                        <span className="text-gray-400">Not Assigned</span>
                      </td> */}

                      {/* STUDENTS */}

                      <td className="border px-4 py-4 text-center">—</td>

                      {/* ACTIONS */}

                      {/* <td className="border px-4 py-4">
                        <div className="flex justify-center gap-2">
                          <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm">
                            View
                          </button> */}

                          {/* <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm">
                            Edit
                          </button>

                          <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm">
                            Delete
                          </button>
                        </div>
                      </td> */}
                    </tr>
                  );
                })
              )}
            </tbody> 
          </table>
        </div>
      </div>
    </div>
  );
}
