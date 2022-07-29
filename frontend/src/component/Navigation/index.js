// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';

import './Navigation.css';
// import SpotsList from '../spots/spotList';
import SpotCreateFormPage from '../spots/spotCreate';
import SpotsBrowser from '../spots/spotList';
// import SpotDetail from '../spots/spotDetail';

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
        <LoginFormModal />
        <NavLink to="/users/signup">Sign Up</NavLink>
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
      <SpotsBrowser/>
    </>
  );
}

export default Navigation;
