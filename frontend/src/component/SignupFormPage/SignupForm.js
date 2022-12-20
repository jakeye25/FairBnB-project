// frontend/src/components/SignupFormPage/index.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css';
import { IoMdClose } from "react-icons/io";

function SignupForm({ setShowsignupForm, setShowModal }) {
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

    if (!email.includes("@") || email.length < 6)
      return setErrors(['Please provide a valid email'])
    if (password === confirmPassword) {
      setErrors([]);


      return dispatch(sessionActions.signup({ email, firstName, lastName, password }))
        .then(
          () => { setShowsignupForm(false) }
        ).then(
          () => { setShowModal(false) }
        )
        .catch(async (res) => {
          const data = await res.json();
          // console.log('signupformerror', data)
          // console.log('signupformerrormsg', data.errors)
          //   if (data && data.errors) setErrors(data.errors);

          const err = Object.values(data.errors)
          // console.log('err', err)
          if (err) setErrors(err);
        })



    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <>
      <div className="signup__container">
        <div className="signup-top">
          <IoMdClose onClick={() => setShowModal(false)} className='signup-top-x' />
          <div className="signup-top-text">Sign up</div>
        </div>
        <h1 className="signup__head">Welcome to FAirBnB</h1>
        {/* </header> */}
        <form className="signupform"
          onSubmit={handleSubmit}>
          <ul id="signuperror">
            {errors.map((error, idx) => <li key={idx} >{error}</li>)}
          </ul>
          <div className="addressform-street" id="addressform-top">

            <label className="signupform-label">Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="signupinput1"
            />
          </div>


          <div className="signupform-div-fn">
            <label className="signupform-label">Firstname</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstname(e.target.value)}
              required
              className="signupinput1"
            />
          </div>
          <div className="signupform-div-fn">

            <label className="signupform-label">Lastname</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastname(e.target.value)}
              required
              className="signupinput1"
            />
          </div>
          <div className="signupform-div-fn">

            <label className="signupform-label">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength='6'
              maxLength='20'
              className="signupinput1"
            />
          </div>
          <div className="signupform-div-bottom">

            <label className="signupform-label">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength='6'
              maxLength='20'
              className="signupinput2"
            />
          </div>


          <button className="signupbutton" type="submit">Sign Up</button>
        </form>
      </div>
    </>
  );
}

export default SignupForm;
