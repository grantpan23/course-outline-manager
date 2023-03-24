import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { Link, useNavigate } from "react-router-dom";
import jwt from "jwt-decode";

function CourseHome() {
    // init:
    // Call API for data
    // addTableRow()
    const history = useNavigate();
    const [data, setData] = useState([]);
    const [status, setStatus] = useState([]);
    const [user, setUser] = useState([]);
    const [template, setTemplate] = useState([])

    const token = window.localStorage.getItem("token");
    // couldn't get use state to work
    let decodedToken = {};



    useEffect(() => {
        verifyInstructor(token);
        popTable();
    }, []);

    // useEffect(() => {
    //     popVersions();
    // }, []);

    const verifyInstructor = (token) => {
        // can add an API to make this secure
        const publicKey = '4b1e67f6e5c8973e841ce716f89c54dec61352d07b7d552a2bd668ec4fe34dc7744223f6575d62ec870ea599c8f61548d9f189c0930c37dbde235a00ad7404ec';
        decodedToken = jwt(token);
    }

    const handleTemplateState = (event) => {
        if (event.target.id == "blank")
            setTemplate(false);
        else if (event.target.id == "template")
            setTemplate(true);
    }

    useEffect(() => {
        openNew();
    }, []);

    const popTable = async () => {
        fetch(process.env.REACT_APP_API_URL + `/api/instructor/${decodedToken.username}/courses/${decodedToken.username}`,
            {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': token
                }
            })
            .then(async (res) => {
                if (res.ok) {
                    const data = await res.json();
                    setData(data);
                }
            })
            .catch(error => {
                console.log(error);
            });
    }


    // function popVersions() {
    //     fetch(process.env.REACT_APP_API_URL + `/api/admin/testadmin/courses`,
    //         {
    //             method: 'GET',
    //             headers: {
    //                 'Content-type': 'application/json',
    //                 'Authorization': token
    //             }
    //         })
    //         .then(async (res) => {
    //             if (res.ok) {
    //                 const data = await res.json();
    //                 setVersion(data);
    //             }
    //         })
    // }

    return (
        <>
            <NavBar></NavBar>
            <div className="container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Course ID</th>
                            <th>Course Name</th>
                            <th>Create Original Version</th>
                            <th>Use Old Version</th>
                        </tr>
                    </thead>
                    <tbody id="tableBody">
                        {data.map(course => (
                            <tr key={course._id}>
                                <td>{course.name}</td>
                                <td>{course.name}</td>

                                <td><Link state={course} className="my-link" to="/instructor/courses/outline/create/drafts"><button id="blank" className='btn btn-primary'>Go to new/drafts</button></Link></td>

                                <td>
                                    <div>
                                        <Link state={template} className="my-link" to="/instructor/courses/outline/create/versions"><button id="template" onClick={handleTemplateState} className="btn btn-secondary">See Previous Years</button></Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}


function addTableRow(column1Value, column2Value, column3Value, column4Value) {
    // Changes needed:
    // - parameter is bulk data
    // - each text content will just be a button that links
    // - New course outline
    // - Use existing template
    // - See review
    // - Print PDF
    // (may be others)

    // Create a new table row element
    const row = document.createElement('tr');

    // Create four table data elements and append them to the new row
    const column1 = document.createElement('td');
    const column2 = document.createElement('td');
    const column3 = document.createElement('td');
    const column4 = document.createElement('td');

    column1.textContent = column1Value;
    column2.textContent = column2Value;
    column3.textContent = column3Value;
    column4.textContent = column4Value;

    row.appendChild(column1);
    row.appendChild(column2);
    row.appendChild(column3);
    row.appendChild(column4);

    // Append the new row to the table body
    document.getElementById('tableBody').appendChild(row);
}

function openNew() {

}


// DONT DELETE!!!  

// {/* <!-- Rows will be dynamically added here --> */}
// <tr>
// {/* Just info here */}
// <td>Software Eng</td>
// <td>SE69</td>

// <td><button className='btn'><Link to="/instructor/courses/outline/create/new">TEST NEW</Link></button></td>
// {/* THIS NEEDS TO ATTACH ITS COURSE TO THE NEWLY CREATED DOCUMENT'S OBJECT AND SENT TO DB*/}

// <td>
//     <select className='form-select'>
//         <option>Choose Template</option>
//         {/* FOLLOW ASSIGNINSTRUCTOR PARADIGM */}
//     </select>
// </td>
// {/*NEEDS A SELECT TAG THAT GETS FILLED / SAME HERE */}


// <td>TEST REVIEW STATUS</td>
// {/* WHEN THIS BUTTON IS CLICKED, THE DOCUMENT IT IS ATTACHED TO NEEDS TO SEND ITS DATA OVER SO THE REVIEW CORRESPONDING TO IT CAN LOAD IN THE REVIEW COMPONENT */}


// <td><Print></Print></td>
// {/* SAME HERE */}
// </tr>
export default CourseHome;