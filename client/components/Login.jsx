
import React, { useState, useEffect } from 'react';
const Login = ({isLoggedIn, loginValidation})=>{
    const [isSignedUp, setIsSignedUp] = useState(false);
    return (
      !isSignedUp ?
      <div id="loginDiv">
      <form>
        <label>Username:</label>
        <input id='username' type='text' placeholder='user' required={true}/>
        <label>Password: </label>
        <input id='password' type='password' placeholder='password' required={true}/>
        <button onClick={(e)=>{
            e.preventDefault();
          let username = document.getElementById('username').value;
          let password = document.getElementById('password').value;
          loginValidation(username, password)
          document.getElementById('username').value = '';
          document.getElementById('password').value = '';
        }}>Log in</button>
        <button onClick={()=>{setIsSignedUp(true)}}>Sign Up</button>
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
    <div id="loginPage">
      <form>
      <input id='usernameSignup' type='text' placeholder='username'/>
      <input id='passwordSignup' type='password' placeholder='password'/>
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