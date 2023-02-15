import React, {useRef, useState, ReactDOM} from 'react'
import { useNavigate} from "react-router-dom";


export default function InstructionHistory() {

    const [error, setError] =useState("")
    const [loading, setLoading] =useState(false)
    const history =useNavigate()


  //  const editor = document.createElement('div')

   //const root = ReactDOM.createRoot(
  //document.getElementById('root'));

    return(

        <div>
        <h1>Courses and Past Instructors</h1>
        
          <div>
          <table>
  <tr>
    <th>Courses</th>
    <th>Instructors</th>
  </tr>
  <tr>
    <td>Alfreds Futterkiste</td>
    <td>Maria Anders</td>
  </tr>
  <tr>
    <td>Centro comercial Moctezuma</td>
    <td>Francisco Chang</td>
  </tr>
</table>
          </div>
        </div>
    )
}
