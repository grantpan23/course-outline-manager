// This page just has a list of reviewable documents and you can hit review to do into review mode
import React, { useEffect, useState, ReactDOM } from 'react'
import { useNavigate } from "react-router-dom";
import NavBar from '../components/NavBar';
import { Link } from 'react-router-dom';

function ReviewHome() {
    const history = useNavigate()

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token){
          history("/")
      }
    }, []);

    return (
        <>
            <NavBar></NavBar>
            <div className="container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Course ID</th>
                            <th>Course Name</th>
                            <th>Course Outline</th>
                            <th>Current Status</th>
                            <th>Recent Author</th>
                            <th>Original Author</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody id="tableBody">
                        {/* <!-- Rows will be dynamically added here --> */}
                        <tr>
                            {/* Just info here */}
                            <td>Software Eng</td>
                            <td>SE69</td>

                            <td><button className='btn'><Link to="/instructor/courses/outline/create/new">TEST NEW</Link></button></td>
                            {/* THIS NEEDS TO ATTACH ITS COURSE TO THE NEWLY CREATED DOCUMENT'S OBJECT AND SENT TO DB*/}

                            <td>
                                <select className='form-select'>
                                    <option>Choose Template</option>
                                    {/* FOLLOW ASSIGNINSTRUCTOR PARADIGM */}
                                </select>
                            </td>
                            {/*NEEDS A SELECT TAG THAT GETS FILLED / SAME HERE */}


                            <td>TEST REVIEW STATUS</td>
                            {/* WHEN THIS BUTTON IS CLICKED, THE DOCUMENT IT IS ATTACHED TO NEEDS TO SEND ITS DATA OVER SO THE REVIEW CORRESPONDING TO IT CAN LOAD IN THE REVIEW COMPONENT */}
                            
                            
                            <td><button className='btn'>TEST PRINT</button></td>
                            {/* SAME HERE */}
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}
export default ReviewHome;