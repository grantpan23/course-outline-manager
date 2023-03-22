import React, { useEffect, useState, ReactDOM } from 'react'
import { useNavigate } from "react-router-dom";
import NavBar from '../components/NavBar';


export default function InstructionHistory() {

  const [courses, setCourses] = useState([])
  const history = useNavigate()
  const token = window.localStorage.getItem("token");






  useEffect(() => {

    const getCourses = async () => {

      fetch("/api/admin/testadmin/courses", {
        method: 'GET',
        headers: {
          'Authorization': token,
          'Content-type': 'application/json'
        }
      })
        .then(async (res) => {
          if (res.ok) {
            const data = await res.json();

            console.log(data);
            setCourses(data)

          }
        })
    }

    getCourses()
  }, [])
  return (
    <>
      <NavBar></NavBar>
      <div>
        <h1>Courses and Past Instructors</h1>

        <div>
          <table>
            <thead>

              <tr>

                <th>Courses: </th>
                <th>Instructors</th>
              </tr>
            </thead>

            <tbody>
              {courses.map((course) => {
                return (
                  <tr>
                    <td>{course.code}</td>
                    <td>{course.instructors}</td>

                  </tr>
                )

              })}

            </tbody>

          </table>
        </div>
      </div>
    </>

  )
}
