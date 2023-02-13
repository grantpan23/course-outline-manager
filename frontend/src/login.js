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
            username: "testadmin",
            password: "password"
        }
        const res = await fetch("/api/auth/users/login", {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(user)
        })

        const data = await res.json();

        if(res.status != 200){
            //handle error
        }

        console.log(data);

        //store jwt somewhere
        
        //nav to somewhere
        history("/home")

    }
  

  async function handleSubmit(e){
      e.preventDefault()

     

      try{
          setError('')
          setLoading(true)
          login(emailRef.current.value, passwordRef.current.value)

          //backend verifying the password and email combo
          //api call
         
         

      }
      catch{
          setError('Failed to log in')
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

            
              <Button disabled={loading} className = "w-100" type="submit"> Log In
              <Link to= "/home"> </Link></Button>
          </Form>

            {/* LOGIN FORM ANDY ADDED */}
            {/* login user */}
            <div className="login">
                <h1>Login</h1>
                <form>
                    <label>Email</label>
                    <input id="loginEmail" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} placeholder="Enter your email" type="email" />

                    <label>Password</label>
                    <input id="loginPassword" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} placeholder="Enter your password" type="password" />

                    <button id="btnLogin" type="button" onClick={login}>Log in</button>
                </form>
            </div>

          <div className ="w-100 text-center mt-3">
         
  </div>
          </Card.Body>
      </Card>
 

  </>
)
}
