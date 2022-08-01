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
      <div className='header'>
        <div className='profile__icon'>
          <ProfileButton user={sessionUser} />
        </div>
      </div>
    );
  } else {
    sessionLinks = (
      <>
        <div className='header'>
        <div className='header__middle'>
          <DemoUser />
        </div>
        <div className='header__right'>
          <div>
            <SignupFormModal />

            <LoginFormModal />
          </div>
        </div>
        </div>
        {/* <NavLink to="/users/signup">Sign Up</NavLink> */}
      </>
    );
  }

  return (
    <>
      <div className='header'>

        <div>
          <NavLink exact to="/">
            {/* Home */}
            <img
            className = "header__icon"
            src = "https://1000logos.net/wp-content/uploads/2017/08/Airbnb-logo.jpg"
            alt=''
            />
            </NavLink>
          {isLoaded && sessionLinks}
        </div>

      </div>
    </>
  );
}

export default Navigation;
