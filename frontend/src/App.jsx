
import CreateOutline from "./createOutline";
import Home from "./home";
import Login from "./login";
import { Link, Route, Routes} from "react-router-dom";

function App() {
  return (
    <>
    <nav>
      <ul>
        <li><Link to= "/home"> Home </Link> </li>
        <li><Link to= "/create"> Create Outline </Link> </li>
      </ul>
    </nav>
      <Routes>
        
      <Route path= "/" element={<Login />} />
      <Route path= "/home" element={<Home />} />

      <Route path= "/create" element={<CreateOutline />} />
      </Routes>
    </>
    


  )
  
 
}

export default App;
