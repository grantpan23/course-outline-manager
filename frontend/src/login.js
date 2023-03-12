import React, {useRef, useState} from 'react'
import {Form, Button, Card, Alert} from 'react-bootstrap'
import {Link, useNavigate} from "react-router-dom";

let route = `localhost:4000/`




export default function Login() {const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] =useState("")
  const [loading, setLoading] =useState(false)
  const history =useNavigate()
    // LOGIN STATE ANDY ADDED
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

//   function login(email, password){
//     try{
//         fetch(route+`api/auth/login`, {
//             method: "POST",
//             headers: {'Content-type': 'application/json'},
//             body: {
//               "username" : email,
//               "tracks" : password
//             }
//           })
//           .then( history("/home"))
          
//       }

    
//     catch{
//         setError("Login wasn't successful, that email and password combination doesn't match")

//     }
// }
   
    // LOGIN ANDY ADDED
    // note: don't need to use .then when using async/await. should be const res = await fetch()...
    const login = async () => {
        const user = {
            username: emailRef.current.value,
            password: passwordRef.current.value
        }
        const res = await fetch("https://server-dot-course-outline-manager-379502.nn.r.appspot.com/api/auth/users/login", {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(user)
        })

        const data = await res.json();

        if(res.status != 200){
            //handle error
        }

        //nav to somewhere
        history("/home")
    }
  

  async function handleSubmit(e){
      e.preventDefault()

      try{
          setError('')
          setLoading(true)
          //backend verifying the password and email combo
          //api call
          login()
      }
      catch{
          
      }
      setLoading(false)
      
  }

return (
  <>
    <h1 className ="text-center mb-4">UWO Course Outline Manager </h1> 
        <Card>
          <Card.Body>
              <h2 className ="text-center mb-4">Log In</h2>
            
              
              {error && <Alert variant ="danger"> {error}</Alert>}
        
          <Form onSubmit={handleSubmit}>
              <Form.Group id ="email">
                  <Form.Label>
                      User Name
                  </Form.Label>
                  <Form.Control type ="textarea" ref ={emailRef} required/>
              </Form.Group>

              <Form.Group id ="password">
                  <Form.Label>
                      Password
                  </Form.Label>
                  <Form.Control type ="password" ref ={passwordRef} required/>
              </Form.Group>

            
              <Button disabled={loading} className = "w-100" type="submit"> Log In</Button>
          </Form>

          <div className ="w-100 text-center mt-3">
         
            </div>
          </Card.Body>
      </Card>
  </>
)
}
