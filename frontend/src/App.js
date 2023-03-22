import React from 'react'
import Editor from "./Editor";
import Home from "./home";
import CourseHome from "./CourseHome";
import Login from "./login";
import AssignInstructor from "./AssignInstructor";
import InstructorHistory from "./instructorHistory"
import EditHistory from "./editHistory"
import GAForm from './GASelect';


import {
  Navigate,
  Route,
  Routes
} from "react-router-dom";
import { v4 as uuidV4 } from 'uuid'

function App() {
  return (
    <>
      <Routes>
        {/* ***OPEN*** */}
        {/* Login */}
        <Route path="/" element={<Login />} />

        {/* Home + Nav Bar */}
        <Route path="/home" element={<Home />} />

        {/* ***INSTRUCTOR*** */}
        <Route path="/instructor/courses" element={<CourseHome />} />

        
        <Route path="/instructor/courses/outline/create/new" element={<Navigate to={`/documents/${uuidV4()}`} />} />
        <Route path="/documents/:id" element={<Editor />} />




        <Route path="/rubric" element={<Navigate to={`/documents/83c52259-c30f-4a88-9f23-83a33e501a6a`} />} />



        {/* ***ADMIN*** */}
        <Route path="/assign-instructor" element={<AssignInstructor />} />
        <Route path="/instructorhistory" element={<InstructorHistory />} />
        <Route path="/edithistory" element={<EditHistory />} />
        <Route path="/gaPage" element={<GAForm />} />

        {/* ***REVIEWER*** */}


      </Routes>
    </>
  )
}

export default App;
