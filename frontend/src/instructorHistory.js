import React, {useRef, useState, ReactDOM} from 'react'
import { useNavigate} from "react-router-dom";


export default function InstructionHistory() {

    const [courses, setUsers] = useState([])
    const history =useNavigate()

    
    async function Courses(){
        
        const res = await fetch("localhost:4000/api/admin/testadmin/courses",{
            method: 'GET',
            headers: {'Authorization': 'LIsPjSabAE6o8AMMMpgMl8zDmoV33eJYCYctXH2ZYM0'}
        }
        )
    }

    useEffect(() =>{
        const getCourses = async() => {
            
        }


        getUsers()

    }, [])
    return(

        <div>
        <h1>Courses and Past Instructors</h1>
        
          <div>
          <table>
  <tr>
    {courses.map((course)=>{
         <div>
            <th>Courses: {course.name}</th>
         <th>Instructors: {course.instructors}</th>
         </div>
    })}
    <th>Courses: </th>
    <th>Instructors</th>
  </tr>
  <tr>
    <td>Alfreds Futterkiste</td>
    <td>Maria Anders</td>
  </tr>
  <tr>
    <td>Centro ssssssssss</td>
    <td>Francisco Chang</td>
  </tr>
</table>
          </div>
        </div>
    )
}
