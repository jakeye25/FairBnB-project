// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./component/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./component/Navigation";
import SpotsBrowser from "./component/spots/spotList";
import UserSpots from "./component/spots/userSpots";
import SpotCreateFormPage from "./component/spots/spotCreate";
import SpotDetail from "./component/spots/spotDetail";
import ReviewsBrowser from "./component/reviews/reviewBrowser";
import UserReviews from "./component/reviews/userReviews";
import SpotEditFormPage from "./component/spots/spotEdit";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path= "/spots/me" exact>
            <UserSpots />
          </Route>
          <Route path= "/spots/create" exact>
            <SpotCreateFormPage />
          </Route>
          <Route path="/spots/:spotId" exact>
            <SpotDetail />
          </Route>
          <Route path= "/spots/:spotId/edit" exact>
            <SpotEditFormPage />
          </Route>
          <Route path="/users/signup" exact>
            <SignupFormPage />
          </Route>
          <Route path="/spots" exact>
            <SpotsBrowser />
          </Route>
          <Route path= "/reviews" exact>
            <ReviewsBrowser />
          </Route>
          <Route path= "/reviews/me" exact>
            <UserReviews />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
