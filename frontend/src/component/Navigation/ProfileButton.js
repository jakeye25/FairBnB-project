// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect} from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { NavLink, Link, useHistory } from "react-router-dom";
// import LoginFormModal from "../LoginFormModal";
// import SignupFormModal from "../SignupFormPage";


function ProfileButton({ user, setShowModal, setShowloginForm, setShowsignupForm }) {
  const history= useHistory()
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push('/')
  };

  return (
    <>
      <div className="profile_button" onClick={openMenu}>
      <i className="fa-solid fa-bars "></i>
        <i className="fas fa-user-circle fa-2x" />
        {/* <i className="fas fa-duotone fa-square-user" /> */}
      </div>
      {user ? showMenu &&  (
        <div className="profile-dropdown">
          {/* <li>{user.username}</li> */}
          <div className="menu-item1">Hi, {user.firstName}</div>
          {/* <li>{user.email}</li> */}
            {/* <div className="menu-item"> */}
            <Link className="menu-item-link" to={`/spots/me`}>Manage listings</Link>
            {/* </div> */}
            {/* <div className="menu-item"> */}
            <Link className="menu-item-link" to={`/spots/create`}>Host an experience</Link>
            {/* </div> */}
            {/* <div className="menu-item"> */}
            <Link className="menu-item-link" to={`/reviews/me`}>Manage reviews</Link>
            {/* </div> */}
          {/* <div className="menu-item"> */}
            <div className="menu-item" onClick={logout}>Log out</div>
          {/* </div> */}
        </div>
      )
        : showMenu && (
          <>
            <div className="profile-dropdown">
              <div className="menu-item" onClick={() => {
                        setShowModal(true)
                        setShowloginForm(true)
                        setShowsignupForm(false)
                        }}>
                {/* <LoginFormModal /> */}
                Log in
              </div>
              <div className="menu-item" onClick={() => {
                        setShowModal(true)
                        setShowsignupForm(true)
                        setShowloginForm(false)
                        }}>
                    Sign up
              </div>
              </div>
          </>
        )
    }
    </>
  );
}

export default ProfileButton;
