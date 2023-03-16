import React from 'react'
import Editor from "./Editor";
import Home from "./home";
import CourseOutlineHome from "./courseOutlineHome";
import Login from "./login";
import AssignInstructor from "./assignInstructor";
import InstructorHistory from "./instructorHistory"
import EditHistory from "./editHistory"
import GAForm from './GASelect';


import {  
  Navigate,
  Link, 
  Route, 
  Routes} from "react-router-dom";
import {v4 as uuidV4} from 'uuid'

function App() {
  return (
    <>
    <nav>
      <ul>
        <li><Link to= "/home"> Home </Link> </li>
        <li><Link to= "/assign-instructor"> Assign Instructor </Link> </li>
        <li><Link to= "/courseOutlineHome"> Course Outline  </Link> </li>
        <li><Link to= "/gaPage">GA Indicator Test</Link></li>

      </ul>
    </nav>
    <Routes>
        {/* change routes to begin with role */}
      <Route path= "/" element={<Login />} />
      <Route path= "/home" element={<Home />} />
      <Route path= "/courseOutlineHome" element={<CourseOutlineHome />} />
      <Route path="/create" element={<Navigate to={`/documents/${uuidV4()}`} />}/>
      <Route path="/rubric" element={<Navigate to={`/documents/83c52259-c30f-4a88-9f23-83a33e501a6a`} />}/>
      <Route path= "/assign-instructor" element={<AssignInstructor />} />
      <Route path="/documents/:id" element={<Editor/>}/>
      //add
      <Route path= "/instructorhistory" element={<InstructorHistory />} />
      <Route path= "/edithistory" element={<EditHistory />} />
      <Route path="/gaPage" element={<GAForm/>} />
      
      </Routes>
      

      
    </>
    


  )
  
 
}

export default App;
