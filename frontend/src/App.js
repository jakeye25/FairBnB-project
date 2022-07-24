import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./component/LoginFormPage";
import SignupFormPage from "./component/SignupFormPage";
import * as sessionActions from "./store/session";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return isLoaded && (
    <Switch>
      <Route path="/api/users/login">
        <LoginFormPage />
      </Route>
      <Route path="/api/users/signup">
        <SignupFormPage />
      </Route>
    </Switch>
  );
}

export default App;
