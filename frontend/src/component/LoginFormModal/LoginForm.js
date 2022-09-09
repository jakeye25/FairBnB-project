// frontend/src/components/LoginFormModal/LoginForm.js
import React, { useState, useEffect } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import './LoginFormModal.css'
import DemoUser from '../Demo User/demouser';


function LoginForm() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  // useEffect(() => {
  //   const errors = [];
  //   if (!email.includes("@")) errors.push("Please provide a valid Email");
  //   setErrors(errors);
  // }, [email]);


  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    if (!email.includes("@") || email.length<6 )
    return setErrors(['Please provide a valid email'])
    return dispatch(sessionActions.login({ email, password }))
    .catch(async (res) => {
      // console.log('res',res)
        const data = await res.json();
        // if (data && data.errors) setErrors(data.errors);
        // console.log('logindata', data)
        const err = Object.values(data)
        // console.log('loginerror', err)
        if(err) setErrors(['Invalid Credential']);
      }
    );
  };

  return (
    <>
      <div className="login__container">
        <h1 className="login__head">Welcome to FairBnB</h1>

        <form onSubmit={handleSubmit} className="loginform">
          <ul>
          {errors.map((error, idx) => <li key={idx} className="loginerror">{error}</li>)}
          </ul>

            <input
            className="logininput"
              type="text"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
            className="logininput"
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />

          <button type="submit" className="loginbutton">Continue</button>
            <div >
              <DemoUser/>
            </div>
        </form>

        </div>
    </>
  );
}

export default LoginForm;
