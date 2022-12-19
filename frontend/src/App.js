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
import LoginForm from "./component/LoginFormModal/LoginForm";
import LoginFormModal from "./component/LoginFormModal";
import Footer from "./component/footer/footer";
import MyBookingListing from "./component/bookings/userBookings";
import ReviewCreateFormPage from "./component/reviews/reviewCreate";
import ReviewEditFormPage from "./component/reviews/reviewEdit";
import ScrollToTop from "./component/Scroll/Scroll";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      <ScrollToTop/>
      {isLoaded && (
        <Switch>
          <Route exact path= "/spots/me">
            <UserSpots />
          </Route>
          <Route path= "/spots/:spotId/newreview" exact>
            <ReviewCreateFormPage />
          </Route>
          {/* <Route path= "/reviews/:id/edit" exact>
            <ReviewEditFormPage />
          </Route> */}
          <Route path= "/spots/:spotId/edit" exact>
            <SpotEditFormPage />
          </Route>
          <Route path= "/spots/create" exact>
            <SpotCreateFormPage />
          </Route>
          <Route path="/spots/:spotId" exact>
            <SpotDetail />
          </Route>
          <Route exact path="/">
            <SpotsBrowser />
          </Route>
          <Route path="/signup" exact>
            <SignupFormPage />
          </Route>
          <Route path="/login" exact>
            <LoginFormModal />
          </Route>
          <Route path= "/reviews/me" exact>
            <UserReviews />
          </Route>
          <Route path= "/mybookings" exact>
            <MyBookingListing />
          </Route>
          {/* <Route path= "/reviews" exact>
            <ReviewsBrowser />
          </Route> */}
        </Switch>
      )}
      {/* <Footer /> */}
    </>
  );
}

export default App;
