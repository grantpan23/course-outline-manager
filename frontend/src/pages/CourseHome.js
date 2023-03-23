import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { Link } from "react-router-dom";
import Print from "../components/Print";

function CourseHome() {
    // init:
    // Call API for data
    // addTableRow()
    const [data, setData] = useState([]);
    const token = window.localStorage.getItem("token");

    useEffect(() => {
        popTable();
    }, []);

    useEffect(() => {
        popTemplates();
    }, []);

    useEffect(() => {
        openNew();
    }, []);

    const popTable = async () => {
        fetch(process.env.REACT_APP_API_URL + `/api/admin/testadmin/courses`,
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

    return (
        <>
            <NavBar></NavBar>
            <div className="container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Course ID</th>
                            <th>Course Name</th>
                            <th>Create</th>
                            <th>Use Old Year</th>
                            <th>Review Status</th>
                            <th>Print</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody id="tableBody">

                        {data.map(course => (
                            <tr key={course._id}>
                                <td>{course.name}</td>
                                <td>{course.name}</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td><Print></Print></td>
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

function popTemplates() {

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