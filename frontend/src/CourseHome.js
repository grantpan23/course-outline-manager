import React from "react";
import NavBar from "./NavBar";

function CourseHome() {
    // init:
    // Call API for data
    // addTableRow()
    return (
        <>
            <NavBar></NavBar>
            <div className="container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Course ID</th>
                            <th>Course Name</th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody id="tableBody">
                        {/* <!-- Rows will be dynamically added here --> */}
                        <tr>
                            <td>Software Eng</td>
                            <td>SE69</td>
                            <td><button className='btn'>TEST NEW</button></td>
                            <td><button className='btn'>TEST TEMPLATE</button></td>
                            <td><button className='btn'>TEST REVIEW</button></td>
                            <td><button className='btn'>TEST PRINT</button></td>
                        </tr>
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

export default CourseHome;