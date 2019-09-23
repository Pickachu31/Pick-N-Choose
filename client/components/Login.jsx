
import React, { useState, useEffect } from 'react';
const Login = ({isLoggedIn, loginValidation})=>{
    const [isSignedUp, setIsSignedUp] = useState(false);
    return (
      !isSignedUp ?
      <div>
      <form>
      Username:<input id='username' type='text' placeholder='username goes here'/>
      Password:<input id='password' type='password' placeholder='password goes here'/>
        <button onClick={(e)=>{
            e.preventDefault();
          let username = document.getElementById('username').value;
          let password = document.getElementById('password').value;
          loginValidation(username, password)
        }}>Log in</button>
        <button onClick={()=>{setIsSignedUp(true)}}> OR Sign up</button>
      </form>
      </div> : <Signup isLoggedIn={isLoggedIn}isSignedUp={isSignedUp} setIsSignedUp={setIsSignedUp}></Signup>
    )
  }
  const Signup = ({isLoggedIn})=>{
    // const [isUserSuccessfullySignedUp, setIsUserSuccessfullySignedUp] = useState(false);
    const sendUserAndPasswordToDatabase = (username, password) =>{
        fetch('/signUp', {
            method: 'post', 
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({username, password})
        })
        .then(response =>{
            return response.json();
        })
        .then(result =>{
            // console.log(result.inserted)
            isLoggedIn(result.inserted);
        })
    }
    
  return (
    <div>
      <form>
      <input id='usernameSignup' type='text' placeholder='username goes here'/>
      <input id='passwordSignup' type='password' placeholder='password goes here'/>
        <button onClick={(e)=>{
            e.preventDefault();
          let username = document.getElementById('usernameSignup').value;
          let password = document.getElementById('passwordSignup').value;
          sendUserAndPasswordToDatabase(username, password)
        }}>Sign up</button>
      </form>
      </div>
  )
  }

export default Login;