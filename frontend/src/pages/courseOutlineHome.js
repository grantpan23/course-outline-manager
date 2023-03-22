import { Link } from "react-router-dom";
import React from "react";

function courseOutlineHome() {


// THIS FILE IS DEPRACTED
// DO NOT USE
// TO BE DELETED


  return (
    <div>

      <Link to="/create">
        <button style={format} onclick> Create new course outline</button>
      </Link>
      <Link to="/rubric">
        <button style={format} onclick>View CEAB Graduate Attribute Generic Rubric</button>
      </Link>

    </div>

  );
}
const format = {
  // padding: '150px 150px',
  width: '500px',
  height: '500px',
  borderRadius: '75px',
  fontSize: '40px',
  marginTop: '100px',
  marginLeft: '160px',
  backgroundColor: "antiquewhite",
  border: '10px solid purple',
};



export default courseOutlineHome;

