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
       /* <div className='header'>*/
      <>
        <div>
            <p>
              <NavLink exact to='/spots/create'>Become a Host</NavLink>
              </p>
              <div className='profile__icon'>
                <ProfileButton user={sessionUser} />
              </div>
          </div>
     </>
    );
  } else {
    sessionLinks = (
      <>
      <p onClick={()=> {alert('You have to login or signup first.')}}>
        Become a Host
      </p>
        <div className='drop'>
            <span>
              <i className="fa-solid fa-bars fa-lg"></i>

              <i className="fas fa-user-circle fa-xl" />
            </span>
          <div className='droplist'>
          <a href="#">
            <SignupFormModal />
          </a>
          <a href="#">
            <LoginFormModal />
          </a>

          </div>

        </div>
        {/* <NavLink to="/users/signup">Sign Up</NavLink> */}
      </>
    );
  }

  return (
    <>
      <div className='header'>

        <div className='header__left'>
          <NavLink exact to="/">
            {/* Home */}

            <img
            className = "header__icon"
            src = "https://user-images.githubusercontent.com/77218939/186223244-9ba08f47-ccf9-4c21-b999-c3a09b4d6108.png"
            alt='logo'
            />
            {/* <i className="fa-solid fa-hotel"></i> */}
            </NavLink>
          <div className='header__right'>
            <div>
              {/* <div>
                Becaome a Host
                <LoginFormModal />
              </div> */}
              </div>
            {isLoaded && sessionLinks}
          </div>
        </div>

      </div>
    </>
  );
}

export default Navigation;
