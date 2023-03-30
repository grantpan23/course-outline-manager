import { useState, useEffect } from 'react';
import decode from 'jwt-decode';

export default function MyOutlines(){
    const token = window.localStorage.getItem("token");
    const decodedToken = decode(token);

    const [outlines,setOutlines] = useState([]);

    useEffect(() => {
        fetchInstructorOutlines();
    },[])

    const fetchInstructorOutlines = async () => {
        const response = await fetch(process.env.REACT_APP_API_URL + `/api/instructor/${decodedToken.username}/outlines`,{
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': token
            }
        });
        const data = await response.json();
        
        setOutlines(data);
        console.log(data);
    }

    return(
        <>
            
        </>
    )
}
