// frontend/src/components/SignupFormPage/index.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

function SignupForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, firstName, lastName, password }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <>
        <div className="user">
        <header class="user__header">
        {/* <img src="https://www.doz.com/wp-content/uploads/2015/03/airbnb-logo.png" alt="" /> */}
        <h1 className="user__title">Welcome to FAirBnB</h1>
        </header>
        <form className="form"
        onSubmit={handleSubmit}>

        <ul>
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <div className="form__group">
        <label>
            Email
            <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form__input"
            />
        </label>
        </div>
        <div className="form__group">
        <label>
            Firstname
            <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstname(e.target.value)}
            required
            className="form__input"
            />
        </label>
        </div>
        <div className="form__group">
        <label>
            Lastname
            <input
            type="text"
            value={lastName}
            onChange={(e) => setLastname(e.target.value)}
            required
            className="form__input"
            />
        </label>
        </div>
        <div className="form__group">
        <label>
            Password
            <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form__input"
            />
        </label>
        </div>
        <div className="form__group">
        <label>
            Confirm Password
            <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="form__input"
            />
        </label>
        </div>
        <button className="btn" type="submit">Sign Up</button>
        </form>
        </div>
    </>
  );
}

export default SignupForm;
