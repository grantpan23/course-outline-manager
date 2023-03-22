import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
    return(
        <nav>
        <ul>
          {/* ***OPEN*** */}
          <li><Link to="/home"> Home </Link> </li>

          {/* ***INSTRUCTOR*** */}
          <li><Link to="/courses">Courses</Link> </li>

          {/* ***ADMIN*** */}
          <li><Link to="/assign-instructor"> Assign Instructor </Link> </li>

        </ul>
      </nav>
    );
}

export default NavBar;