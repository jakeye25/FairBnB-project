import React from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";

export default function DemoUser() {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = "user2@user.io";
    const password = "password2";
    return dispatch(sessionActions.login({ email, password }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Demo User</button>
    </form>
  );
}