import { Link} from "react-router-dom";
import React from "react";
import { useNavigate } from 'react-router-dom';
import {v4 as uuidv4} from 'uuid';
import { useEffect } from 'react';
function courseOutlineHome() {
const navigate = useNavigate; 


  function handleClick() {
    useEffect (() => {
      navigate(`/documents/${uuidv4()}`);

    }, [])
    
  }

    return (
         <div>
    
      <button style={format} onclick={handleClick()}> Create new course outline</button>

      <Link to= ""> 
      <button style={format} onclick>Use past course outline</button>
      </Link>
      
     </div>
    
    );
}
      const format={
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

   