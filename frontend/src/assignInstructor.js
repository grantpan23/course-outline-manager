import React, { useState, useEffect } from "react";

const AssignInstructor = () => {
  const [selectedInstructor, setSelectedInstructor] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [instructors, setInstructors] = useState([]);
  const [courses, setCourses] = useState([]);

  // Populate the instructors dropdown box
  // Needs to have dynamic checking of admin (change URL 'test admin' + authorizaiton + use of jwt)
  
  
  //<Link to= "/pastInstructors"> 
    //  <button style={format} onclick> View past instructors</button>
    //  </Link>

  useEffect(() => {
    popInstructors();
  }, []);

  useEffect(() => {
    popCourses();
  }, []);

  const popInstructors = async () => {
    fetch(`/api/admin/gpan7/users/instructors`,
      {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          // 'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RhZG1pbiIsImVtYWlsIjoidGVzdGFkbWluQHV3by5jYSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY3NTU2NDAzN30.gaZ8CcaY_6rLyOrZ2N0zP_t8qLCACFtNb_G6HrHWwNA'
        }
      })
      .then(async (res) => {
        if (res.ok) {
          const data = await res.json();
          setInstructors(data);
        }
      })
  }

  // Needs to have dynamic checking of admin (change URL 'test admin' + authorizaiton + use of jwt)
  const popCourses = async () => {
    fetch(`/api/admin/testadmin/courses`,
      {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          // 'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RhZG1pbiIsImVtYWlsIjoidGVzdGFkbWluQHV3by5jYSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY3NTU2NDAzN30.gaZ8CcaY_6rLyOrZ2N0zP_t8qLCACFtNb_G6HrHWwNA'
        }
      })
      .then(async (res) => {
        if (res.ok) {
          const data = await res.json();
          setCourses(data);
        }
      })
  }

  const handleInstructorChange = event => {
    setSelectedInstructor(event.target.value);
  };

  const handleCourseChange = event => {
    setSelectedCourse(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    // call the  saveToDB put api
    saveToDB(selectedInstructor, selectedCourse);
  };

  // saveToDB
  const saveToDB = async (instructor, course) => {
    const obj = {
      instructorUsername: instructor,
      courseCode: course
    };
    if (validAssign(instructor, course)) {
      fetch(`/api/admin/testadmin/courses/${course}/instructors`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
          'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RhZG1pbiIsImVtYWlsIjoidGVzdGFkbWluQHV3by5jYSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY3NTU2NDAzN30.gaZ8CcaY_6rLyOrZ2N0zP_t8qLCACFtNb_G6HrHWwNA'
        },
        body: JSON.stringify(obj)
      })
        .then(async res => {
          if (res.ok) {
            let data = await res.json();
            alert(`Instructor: ${selectedInstructor} assigned to Course: ${selectedCourse}`);
          }
          else {
            let data = res.json();
            alert('Unsuccessful')
          }
        })
    }
    else {
      alert(`Cannot assign instructor to course. Instructor: ${selectedInstructor} is already assigned to Course: ${selectedCourse}`);
    }
  };

  const validAssign = (instructor, course) => {
    let matchingInstructor = instructors.filter(match => {
      return match.username === instructor;
    })[0];
    let matchingCourse = matchingInstructor.coursesTaught.filter(match => {
      return match === course;
    });
    if (matchingCourse.length > 0)
      return false;
    else return true;
  }

  return (
    // <form onSubmit={handleSubmit} onLoad={popInstructors}>
    //   <div>
    //     <label htmlFor="instructors">Select Instructor:</label>
    //     <select id="instructors" onChange={handleInstructorChange}>
    //       <option value="">--Select Instructor--</option>
    //       {instructors.map(instructor => (
    //         <option key={instructor.id} value={instructor.username}>
    //           {instructor.firstName + " " + instructor.lastName}
    //         </option>
    //       ))}
    //     </select>
    //   </div>
    //   <div>
    //     <label htmlFor="courses">Select Course:</label>
    //     <select id="courses" onChange={handleCourseChange}>
    //       <option value="">--Select Course--</option>
    //       {courses.map(course => (
    //         <option key={course._id} value={course.code}>
    //           {course.name + " [" + course.faculty + "]"}
    //         </option>
    //       ))}
    //     </select>
    //   </div>
    //   <button type="submit">Submit</button>
    //   <button type="button">Back</button>
    // </form>
    <form onSubmit={handleSubmit} onLoad={popInstructors} className="d-flex flex-column align-items-center">
      <div className="form-group">
        <label htmlFor="instructors">Select Instructor:</label>
        <select id="instructors" onChange={handleInstructorChange} className="form-control">
          <option value="">--Select Instructor--</option>
          {instructors.map(instructor => (
            <option key={instructor.id} value={instructor.username}>
              {instructor.firstName + " " + instructor.lastName}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="courses">Select Course:</label>
        <select id="courses" onChange={handleCourseChange} className="form-control">
          <option value="">--Select Course--</option>
          {courses.map(course => (
            <option key={course._id} value={course.code}>
              {course.name + " [" + course.faculty + "]"}
            </option>
          ))}
        </select>
      </div>
      <br></br>
      <div className="form-group d-flex justify-content-between">
        <button type="submit" className="btn btn-primary">Submit</button>
      </div>
    </form>
  );
};

export default AssignInstructor;
