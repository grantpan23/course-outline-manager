import React, { useEffect, useState, ReactDOM } from 'react'
import { useNavigate } from "react-router-dom";
import NavBar from '../components/NavBar';


export default function InstructionHistory() {

  const [editHistory, seteditHistory] = useState([])
  const history = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      history("/")
    }
  }, []);





  useEffect(() => {

    const geteditHistorys = async () => {

      fetch("/api/admin/testadmin/activity", {
        method: 'GET',
        headers: {
          'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RhZG1pbiIsImVtYWlsIjoidGVzdGFkbWluQHV3by5jYSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY3NjQ5NTk0OH0.LIsPjSabAE6o8AMMMpgMl8zDmoV33eJYCYctXH2ZYM0',
          'Content-type': 'application/json'
        }
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
  return (
    <>
      <NavBar></NavBar>
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
              {editHistory.map((edits) => {
                return (
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
    </>

  )
}
