import React, {useEffect, useState, ReactDOM} from 'react'
import { useNavigate} from "react-router-dom";


export default function InstructionHistory() {

    const [editHistory, seteditHistory] = useState([])
    const history =useNavigate()
    const token =window.localStorage.getItem("token");

    console.log(token) 

  


     

    useEffect(() =>{

        const geteditHistorys =async() => {

            fetch ("/api/admin/testadmin/activity",{
               method: 'GET',
               headers: {'Authorization':  token,
               'Content-type': 'application/json'}
           })
           .then(async (res) => {
               if (res.ok) {
           const data = await res.json();
          
           console.log(data);
           seteditHistory(data)     

           
           }
       })
   }
        
   geteditHistorys()
    }, [])
    return(

        <div>
        <h1>Activity History</h1>
        
          <div>
          <table>
<thead>

  <tr>
   
    <th>User </th>
    <th>Activity </th>
    <th>Document </th>
    <th>Time Stamp </th>
  </tr>
  </thead>

  <tbody>
  {editHistory.map((edits)=>{
    return(
        <tr>
        <td>{edits.userID}</td>
        <td>{edits.activity}</td>
        <td>{edits.docID}</td>
        <td>{edits.timeStamp}</td>



    </tr>
    )
     
    })}

  </tbody>
  
</table>
          </div>
        </div>
    )
}
