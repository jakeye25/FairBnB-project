import React from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";

export default function DemoUser({setShowloginForm, setShowModal}) {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = "demo@user.io";
    const password = "password";
    setShowloginForm(false)
    setShowModal(false)
    return dispatch(sessionActions.login({ email, password }))

  };

  return (
    <form onSubmit={handleSubmit}>
      <button className="login__demouser" type="submit">Continue as Demo User</button>
    </form>
  );
}
