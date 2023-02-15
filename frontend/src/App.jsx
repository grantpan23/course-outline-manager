import React from 'react'
import Editor from "./Editor";
import CreateBlankOutline from "./createBlankOutline";
import Home from "./home";
import CourseOutlineHome from "./courseOutlineHome";
import Login from "./login";
import AssignInstructor from "./assignInstructor";
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

      </ul>
    </nav>
    <Routes>
        {/* change routes to begin with role */}
      <Route exact path= "/" component={<Home />} />
      <Route path= "/home" element={<Home />} />
      <Route path= "/courseOutlineHome" element={<CourseOutlineHome />} />
      <Route path="/create" element={<Navigate to={`/documents/${uuidV4()}`} />}/>
      <Route path= "/assign-instructor" element={<AssignInstructor />} />
      <Route path="/documents/:id" element={<Editor/>}/>
      </Routes>
      

      
    </>
    


  )
  
 
}

export default App;
