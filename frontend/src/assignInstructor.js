import React, { useState } from "react";

const AssignInstructor = () => {
  const [selectedInstructor, setSelectedInstructor] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");

  const instructors = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Doe" },
    { id: 3, name: "Jim Smith" },
    { id: 4, name: "ahuang95"}
  ];

  const courses = [
    { id: 1, name: "React 101" },
    { id: 2, name: "JavaScript 102" },
    { id: 3, name: "Node.js 103" },
    { id: 4, name: "SE3313"}
  ];

  const handleInstructorChange = event => {
    setSelectedInstructor(event.target.value);
  };

  const handleCourseChange = event => {
    setSelectedCourse(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    // Add your submit logic here
    // call the  saveToDB put api
    saveToDB(selectedInstructor, selectedCourse);
    console.log(`Instructor: ${selectedInstructor} assigned to Course: ${selectedCourse}`);
  };

  // saveToDB
  const saveToDB = async (instructor, course) => {
    const obj = {
      instructorUsername: instructor,
      courseCode: course
    }
    fetch(`/api/admin/testadmin/courses/${course}/instructors`, {
      method: 'PUT',
      headers: {'Content-type': 'application/json',
                'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RhZG1pbiIsImVtYWlsIjoidGVzdGFkbWluQHV3by5jYSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY3NTU2NDAzN30.gaZ8CcaY_6rLyOrZ2N0zP_t8qLCACFtNb_G6HrHWwNA'
              },
      body: JSON.stringify(obj)
    })
    .then(async res => {
      if (res.ok){
        let data = await res.json();
        console.log(data);
      }
      else{
        let data = res.json();
        console.log(res);
        console.log(data);
      }
    })
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="instructors">Select Instructor:</label>
        <select id="instructors" onChange={handleInstructorChange}>
          <option value="">--Select Instructor--</option>
          {instructors.map(instructor => (
            <option key={instructor.id} value={instructor.name}>
              {instructor.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="courses">Select Course:</label>
        <select id="courses" onChange={handleCourseChange}>
          <option value="">--Select Course--</option>
          {courses.map(course => (
            <option key={course.id} value={course.name}>
              {course.name}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Submit</button>
      <button type="button">Back</button>
    </form>
  );
};

export default AssignInstructor;