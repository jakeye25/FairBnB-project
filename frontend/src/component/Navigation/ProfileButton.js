// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect} from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { NavLink, Link, useHistory } from "react-router-dom";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormPage";


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
      <div onClick={openMenu}>
      <i className="fa-solid fa-bars "></i>
        <i className="fas fa-user-circle fa-2x" />
        {/* <i className="fas fa-duotone fa-square-user" /> */}
      </div>
      {user ? showMenu &&  (
        <div className="profile-dropdown">
          {/* <li>{user.username}</li> */}
          <div>{user.firstName}</div>
          {/* <li>{user.email}</li> */}
            <div>
            <Link to={`/spots/me`}>My Spots</Link>
            </div>
            <div>
            <Link to={`/spots/create`}>Create Spot</Link>
            </div>
            <div>
            <Link to={`/reviews/me`}>My Review</Link>
            </div>
          <div>
            <div onClick={logout}>Log Out</div>
          </div>
        </div>
      )
        : showMenu && (
          <>
              <button onClick={() => {
                        setShowModal(true)
                        setShowloginForm(true)
                        setShowsignupForm(false)
                        }}>
                {/* <LoginFormModal /> */}
                login
              </button>
              <button onClick={() => {
                        setShowModal(true)
                        setShowsignupForm(true)
                        setShowloginForm(false)
                        }}>
                    signup
              </button>
          </>
        )
    }
    </>
  );
}

export default ProfileButton;
