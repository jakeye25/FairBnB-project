// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';


import './Navigation.css';
import SignupFormModal from '../SignupFormPage';
import DemoUser from '../Demo User/demouser';
// import HomeRightBtn from './HomeRightBtn';



function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
       /* <div className='header'>*/
        <div className='profile__icon'>
          <ProfileButton user={sessionUser} />
        </div>
      /* </div> */
    );
  } else {
    sessionLinks = (
      <>
        <div className='header'>
        <div className='header__right'>

          <div>
            <DemoUser />

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
            src = "https://user-images.githubusercontent.com/77218939/186223244-9ba08f47-ccf9-4c21-b999-c3a09b4d6108.png"
            alt='logo'
            />
            {/* <i className="fa-solid fa-hotel"></i> */}
            </NavLink>
          {isLoaded && sessionLinks}
        </div>

      </div>
    </>
  );
}

export default Navigation;
