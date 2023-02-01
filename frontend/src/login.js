import React, {useRef, useState} from 'react'
import {Form, Button, Card, Alert} from 'react-bootstrap'




export default function Login() {const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] =useState("")
  const [loading, setLoading] =useState(false)


  async function verifyEmail(){
    setError('')

    try{
       
        setError('Email sent to the given email!')
    }
      
    
    catch{
        setError('Failed to send email')
        
    }
    
}


 
 
  

  async function handleSubmit(e){
      e.preventDefault()

     

      try{
          setError('')
          setLoading(true)
      }
      catch{
          setError('Failed to log in')
      }
      setLoading(false)
      
  }

return (
  <>
           <p>The Music Spot: This music application offers you the ability to search for your favourite music and interact with music the way to want to! Whether it be with customizing playlists or searching for music, this is the spot for your music!</p>
      <Card>
          <Card.Body>
              <h2 className ="text-center mb-4">Log In</h2>
            
              
              {error && <Alert variant ="danger"> {error}</Alert>}
        
          <Form onSubmit={handleSubmit}>
              <Form.Group id ="email">
                  <Form.Label>
                      Email
                  </Form.Label>
                  <Form.Control type ="email" ref ={emailRef} required/>
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
  <div className ="w-100 text-center mt-2">
      <Button variant ="link" onClick={verifyEmail}>Verify Email</Button> 

  </div>

  </>
)
}
