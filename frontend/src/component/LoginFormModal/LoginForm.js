// frontend/src/components/LoginFormModal/LoginForm.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import './LoginFormModal.css'
import DemoUser from '../Demo User/demouser';
import { IoMdClose } from "react-icons/io";

function LoginForm({ setShowloginForm, setShowModal }) {
  // const history = useHistory()
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
    if (!email.includes("@") || email.length < 6)
      return setErrors(['Please provide a valid email'])


    return dispatch(sessionActions.login({ email, password }))
      .then(() => { setShowloginForm(false) })
      .then(() => { setShowModal(false) })
      .catch(async (res) => {
        // console.log('res',res)
        const data = await res.json();
        // if (data && data.errors) setErrors(data.errors);
        // console.log('logindata', data)
        const err = Object.values(data)
        // console.log('loginerror', err)
        if (err) setErrors(['Invalid Credential']);

      }
      );
  };

  return (
    <>
      <div className="login__container">
        <div className="signup-top">
          <IoMdClose onClick={() => setShowModal(false)} className='signup-top-x' />
          <div className="signup-top-text">Log in</div>
        </div>
        <h1 className="login__head">Welcome to FairBnB</h1>

        <form onSubmit={handleSubmit} className="loginform">
          <ul className="loginerror">
            {errors.map((error, idx) => <li key={idx} >{error}</li>)}
          </ul>
          <div className="addressform-street" id="addressform-top">

            <label className="signupform-label">Email</label>
            <input
              className="signupinput1"
              type="text"
              value={email}

              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="signupform-div-bottom">
            <label className="signupform-label">Password</label>
            <input
              className="signupinput1"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="loginbutton">Continue</button>
        </form>

        <DemoUser setShowloginForm={setShowloginForm} setShowModal={setShowModal} />

      </div>
    </>
  );
}

export default LoginForm;
