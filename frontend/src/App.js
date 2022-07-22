import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './component/LoginFormPage';

function App() {
  return (
    <Switch>
      <Route path="/api/users/login">
        <LoginFormPage />
      </Route>
    </Switch>
  );
}

export default App;
