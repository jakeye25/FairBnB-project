// frontend/src/components/Navigation/index.js
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';


import './Navigation.css';
import SignupFormModal from '../SignupFormPage';
import { Modal } from '../../context/Modal';
import LoginForm from '../LoginFormModal/LoginForm';
import SignupForm from '../SignupFormPage/SignupForm';
// import DemoUser from '../Demo User/demouser';




function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  // const [showloginMenu, setshowloginMenu] = useState(false);
//   const toggleloginMenu =() => {
//     setshowloginMenu(!showloginMenu)
// }
const [showModal, setShowModal] = useState(false)

const[showsignupForm, setShowsignupForm] = useState(false)
const[showloginForm, setShowloginForm] = useState(false)


  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
       /* <div className='header'>*/
      <>
        <div>
            <p className='becomehost'>
              <NavLink exact to='/spots/create'>Become a Host</NavLink>
              </p>

                <ProfileButton user={sessionUser} />

          </div>
     </>
    );
  } else {
    sessionLinks = (
      <div>

          <p className='becomehost' onClick={()=> {alert('You have to login or signup first.')}}>
            Become a Host
          </p>
          <ProfileButton user={sessionUser} setShowModal={setShowModal}
          setShowloginForm={setShowloginForm} setShowsignupForm={setShowsignupForm}/>

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

      </div>
    );
  }
  console.log('showing loginform', showloginForm)
  console.log('showing signupform', showsignupForm)
  console.log('showing model', showModal)
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

            </NavLink>
        </div>
          <div className='header__right'>

            {isLoaded && sessionLinks}
          </div>
          {showModal &&
          (<Modal onClose={() => setShowModal(false)}>
          {showloginForm && <LoginForm setShowloginForm={setShowloginForm} setShowModal={setShowModal}/>}
          {showsignupForm && <SignupForm setShowsignupForm={setShowsignupForm} setShowModal={setShowModal} />}
        </Modal>)
        }

      </div>
    </>
  );
}

export default Navigation;
