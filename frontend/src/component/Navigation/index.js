// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';


import './Navigation.css';
import SignupFormModal from '../SignupFormPage';
import DemoUser from '../Demo User/demouser';



function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <div>
          <LoginFormModal />
        </div>
        <div>
          <SignupFormModal />
        </div>
        <div>
          <DemoUser />
        </div>

        {/* <NavLink to="/users/signup">Sign Up</NavLink> */}
      </>
    );
  }

  return (
    <>
      <ul>
        <li>
          <NavLink exact to="/">Home</NavLink>
          {isLoaded && sessionLinks}
        </li>
      </ul>

    </>
  );
}

export default Navigation;
