import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import jwt from "jwt-decode";


function Drafts() {
    // let decodedToken = {};
    // const token = window.localStorage.getItem("token");
    // const verifyInstructor = (token) => {
    //     // can add an API to make this secure
    //     decodedToken = jwt(token);
    //     console.log(decodedToken)
    // }

    // const popTable = async () => {
    //     fetch(process.env.REACT_APP_API_URL + `/api/instructor/${decodedToken.username}/courses/${decodedToken.username}`,
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
    //                 setData(data);
    //             }
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         });
    // }


    return ( ''
    // <>
    //     <div className="nav-buttons">
    //         <Link className="my-link" to="/instructor/courses"><button className='btn btn-danger'>Discard</button></Link>
    //         <button className='btn btn-success'>  Submit  </button>
    //     </div>

    //     <div className="container">
    //             <table className="table">
    //                 <thead>
    //                     <tr>
    //                         <th>Doucment ID</th>
    //                         <th>Status</th>
    //                         <th></th>
    //                     </tr>
    //                 </thead>
    //                 <tbody id="tableBody">
    //                     {data.map(document => (
    //                         <tr key={document._id}>
    //                             <td>{document.timeStamp}</td>
    //                             <td>{document.status}</td>

    //                             <td><Link className="my-link" to="/instructor/documents/outline/create/drafts"><button id="blank" className='btn btn-primary'>Go to new/drafts</button></Link></td>

    //                             <td>
    //                                 <div>
    //                                     <Link state={template} className="my-link" to="/instructor/documents/outline/create/versions"><button id="template" onClick={handleTemplateState} className="btn btn-secondary">See Previous Years</button></Link>
    //                                 </div>
    //                             </td>

    //                             <td>status needed</td>

    //                             <td><Print></Print></td>
    //                         </tr>
    //                     ))}
    //                 </tbody>
    //             </table>
    //         </div>
    // </>
        );
}

export default Drafts;