import React from 'react'
import Editor from "./components/Editor";
import Home from "./pages/Home";
import CourseHome from "./pages/CourseHome";
import Login from "./components/Login";
import AssignInstructor from "./pages/AssignInstructor";
import InstructorHistory from "./pages/InstructorHistory"
import EditHistory from "./pages/EditHistory"
import Versions from './pages/Versions';
import GASelect from './components/GASelect';
import ReviewHome from './pages/ReviewHome';
import { v4 as uuidV4 } from 'uuid'
import {
  Navigate,
  Route,
  Routes
} from "react-router-dom";




function App() {
  return (
    <>
      <Routes>
        {/* ***OPEN*** */}
        {/* Login */}
        <Route path="/" element={<Login />} />

        {/* ***SECURE*** */}
        <Route path="/home" element={<Home />} />
        <Route path="/documents/:id" element={<Editor />} />


        {/* ***INSTRUCTOR*** */}
        <Route path="/instructor/courses" element={<CourseHome />} />
        <Route path="/instructor/courses/outline/create/ga-indicators" element={<GASelect />} />

        <Route path="/instructor/courses/outline/create/new" element={<Navigate to={`/documents/${uuidV4()}`} />} />
        


        <Route path='/instructor/courses/outline/create/versions' element={<Versions />}/>

        <Route path="/rubric" element={<Navigate to={`/documents/83c52259-c30f-4a88-9f23-83a33e501a6a`} />} />



        {/* ***DEPARTMENT ADMINISTRATOR*** */}
        <Route path="/admin/assign-instructor" element={<AssignInstructor />} />
        <Route path="/admin/instructorhistory" element={<InstructorHistory />} />
        <Route path="/admin/edithistory" element={<EditHistory />} />
        

        {/* ***PROGRAM DIRECTOR (can't see see course outline history)*** */}
        <Route path="/reviewer/pending" element={<ReviewHome />} />
        {/* ***DEPARTMENT CHAIR*** */}
        <Route path='/department-chair/versions' element={<Versions />}/>

      </Routes>
    </>
  )
}

export default App;
