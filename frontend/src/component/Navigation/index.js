// frontend/src/components/Navigation/index.js
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
// import LoginFormModal from '../LoginFormModal';


import './Navigation.css';
// import SignupFormModal from '../SignupFormPage';
import { Modal } from '../../context/Modal';
import LoginForm from '../LoginFormModal/LoginForm';
import SignupForm from '../SignupFormPage/SignupForm';
import Searchbar from '../Search/Searchbar';
// import DemoUser from '../Demo User/demouser';




function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  // const [showloginMenu, setshowloginMenu] = useState(false);
  //   const toggleloginMenu =() => {
  //     setshowloginMenu(!showloginMenu)
  // }
  const [showModal, setShowModal] = useState(false)

  const [showsignupForm, setShowsignupForm] = useState(false)
  const [showloginForm, setShowloginForm] = useState(false)


  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      /* <div className='header'>*/
      <>

        <p className='becomehost'>
          <NavLink exact to='/spots/create'>Switch to hosting</NavLink>
        </p>

        <ProfileButton user={sessionUser} />


      </>
    );
  } else {
    sessionLinks = (
      <>

        <p className='becomehost' onClick={() => { alert('You have to login or signup first.') }}>
          Become a Host
        </p>
        <ProfileButton user={sessionUser} setShowModal={setShowModal}
          setShowloginForm={setShowloginForm} setShowsignupForm={setShowsignupForm} />

        {/* <div className='drop' >
                <span>
                  <i className="fa-solid fa-bars"></i>

                  <i className="fas fa-user-circle fa-2x" />
                </span>
            </div>
                {showloginMenu &&  <div className='droplist'> */}
        {/* <a href="#"> */}

        {/* <SignupFormModal /> */}
        {/* </a> */}
        {/* <a href="#"> */}
        {/* <LoginFormModal /> */}
        {/* </a> */}

        {/* </div>} */}

      </>
    );
  }
  // console.log('showing loginform', showloginForm)
  // console.log('showing signupform', showsignupForm)
  // console.log('showing model', showModal)
  return (
    <>
      <nav id='header'>

        <div id='header__left'>
          <NavLink exact to="/">
            {/* Home */}
            <img
              id="header__icon"
              src="https://user-images.githubusercontent.com/77218939/192109460-9d6b0966-9190-4b02-beb0-8deeafca0257.PNG"
              alt='logo'
            />

          </NavLink>
        </div>
        <div id="search_bar_container">
          <div id="search_bar">
            <Searchbar />
          </div>
        </div>

        <div className='header__right'>
          {/* <div className='aboutlink'>
            <a
              className="more_info_text"
              href="https://www.linkedin.com/in/jake-ye-a2365250/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-linkedin fa-2xl">&nbsp;</i>
            </a>
            <a
              className="more_info_text"
              href="https://github.com/jakeye25"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-square-github fa-2xl">&nbsp;</i>
            </a>
            <a
              className="email_link"
              href="mailto:kebonkim@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-solid fa-envelope fa-2xl"></i>
            </a>
          </div> */}
          {isLoaded && sessionLinks}
        </div>
        {showModal &&
          (<Modal onClose={() => setShowModal(false)}>
            {showloginForm && <LoginForm setShowloginForm={setShowloginForm}
              setShowModal={setShowModal} />}
            {showsignupForm && <SignupForm setShowsignupForm={setShowsignupForm}
              setShowModal={setShowModal} />}
          </Modal>)
        }

      </nav>
    </>
  );
}

export default Navigation;
