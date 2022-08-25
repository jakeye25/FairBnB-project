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
    if (!email.includes("@"))
    return setErrors(['Please provide a valid email'])
    return dispatch(sessionActions.login({ email, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);

      }
    );
  };

  return (
    <>
      <div className="login__container">
        <h3 className="login__head">Welcome to FairBnB</h3>
        {errors.length > 0 && (
        <div>
          {/* <ul>
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul> */}
        </div>
        )}
        <form onSubmit={handleSubmit} className="loginform">
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <label>
            Email
            <input
            className="logininput"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Password
            <input
            className="logininput"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button type="submit" className="loginbutton">Continue</button>
        </form>

            <div className="login__demouser">
              <DemoUser/>
            </div>
        </div>
    </>
  );
}

export default LoginForm;
