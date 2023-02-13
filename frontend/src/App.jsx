
import CreateOutline from "./createOutline";
import Home from "./home";
import Login from "./login";
import AssignInstructor from "./admin"
import InstructorHistory from "./instructorHistory"
import { Link, Route, Routes} from "react-router-dom";

function App() {
  return (
    <>
    <nav>
      <ul>
        <li><Link to= "/home"> Home </Link> </li>
        <li><Link to= "/create"> Create Outline </Link> </li>
        <li><Link to= "/assign-instructor"> Assign Instructor </Link> </li>
      </ul>
    </nav>
      <Routes>
        {/* change routes to begin with role */}
      <Route path= "/" element={<Login />} />
      <Route path= "/home" element={<Home />} />
      <Route path = "/instructorhistory" element={<InstructorHistory />}/>

      <Route path= "/create" element={<CreateOutline />} />
      <Route path= "/assign-instructor" element={<AssignInstructor />} />
      </Routes>
    </>
    


  )
  
 
}

export default App;
