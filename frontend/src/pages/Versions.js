import React, { useState, useEffect } from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
import jwt from 'jwt-decode';
import Print from '../components/Print';

function Versions() {
    const token = window.localStorage.getItem("token");
    const location = useLocation();

    const course = location.state;
    // couldn't get use state to work
    let decodedToken = {};
    const [idData, setIdData] = useState([]);
    const [yearData, setYearData] = useState([]);
    const [dummyObj, setDummyObj] = useState([]);

    useEffect(() => {
        verifyInstructor(token);
        popTable();
    }, []);

    const verifyInstructor = (token) => {
        // can add an API to make this secure
        decodedToken = jwt(token);
    }

    const buildArray = () => {
        console.log('a')
        let i = 0;
        yearData.forEach((year) => {
            let foo = {
                'year': year,
                'id': idData[0]
            }
            let fi = dummyObj; 
            fi.push(foo);
            setDummyObj(fi);
            i++;
        })
    }

    const popTable = async () => {
        
        fetch(process.env.REACT_APP_API_URL + `/api/instructor/${decodedToken.username}/final-outlines/${course.code}`,
            {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': token
                }
            }) 
            .then(async (res) => {
                if (res.ok) {
                    let obj = await res.json();
                    console.log(obj);
                    let ids = Object.values(obj);
                    console.log(ids)
                    let years = Object.keys(obj);
                    console.log(years)
                    setIdData(ids);
                    setYearData(years);
                    buildArray();
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <>
            <div className="nav-buttons">
                <Link className="my-link" to="/instructor/courses"><button className='btn btn-danger'>Discard</button></Link>
                <button className='btn btn-success'>Submit</button>
            </div>

            <div className="container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Year</th>
                            <th>Author</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody id="tableBody">
                        {dummyObj.map((doc, index) => (
                            <tr key={index}>
                                <td>{doc.year}</td>
                                <td></td>

                                <td><Link state={doc.id} className="my-link" to="/instructor/courses/outline/create/ga-indicators"><button id="blank" className='btn btn-primary'>Edit</button></Link></td>


                                <td><Print></Print></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </>
    );
}

export default Versions;