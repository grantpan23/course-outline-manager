import { Link} from "react-router-dom";
import React from "react";
function courseOutlineHome() {
    return (
         <div>
    
        <Link to= "/create"> 
      <button style={format} onclick>Create new course outline</button>
      </Link>
      <Link to= ""> 
      <button style={format} onclick>Use past course outline</button>
      </Link>
      
     </div>
    
    );
}
      const format={
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

   
