// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';


import './Navigation.css';
import SignupFormModal from '../SignupFormPage';
import DemoUser from '../Demo User/demouser';
import HomeRightBtn from './HomeRightBtn';



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
            {/* <HomeRightBtn/> */}
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
            src = "https://ebenezersuites.com/wp-content/uploads/2016/06/airbnb-logo-266x300@2x.png"
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
