// frontend/src/components/SignupFormPage/index.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

function SignupForm({setShowsignupForm, setShowModal}) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  // useEffect(() => {
  //   const errors = [];
  //   if (!email.includes("@")) errors.push("Please provide a valid Email");
  //   setErrors(errors);
  // }, [email]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.includes("@"))
    return setErrors(['Please provide a valid email'])
    if (password === confirmPassword) {
      setErrors([]);

    setShowsignupForm(false)
    setShowModal(false)

      return dispatch(sessionActions.signup({ email, firstName, lastName, password }))
        .catch(async (res) => {
          const data = await res.json();
        //   if (data && data.errors) setErrors(data.errors);
        const err = Object.values(data.errors)
        if(err) setErrors(err);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <>
        <div className="signup__container">
        {/* <header class="user__header"> */}
        {/* <img src="https://www.doz.com/wp-content/uploads/2015/03/airbnb-logo.png" alt="" /> */}
        <h1 className="signup__head">Welcome to FAirBnB</h1>
        {/* </header> */}
        <form className="signupform"
        onSubmit={handleSubmit}>

        <ul>
            {errors.map((error, idx) => <li key={idx} className="signuperror">{error}</li>)}
        </ul>

            <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="signupinput"
            placeholder="Email"
            />



            <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstname(e.target.value)}
            required
            placeholder="Firstname"
            className="signupinput"
            />

            <input
            type="text"
            value={lastName}
            onChange={(e) => setLastname(e.target.value)}
            required
            placeholder="Lastname"
            className="signupinput"
            />

            <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
            className="signupinput"
            />

            <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder="Confirm Password"
            className="signupinput"
            />


          <button className="signupbutton" type="submit">Sign Up</button>
        </form>
        </div>
    </>
  );
}

export default SignupForm;
