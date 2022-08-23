// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect} from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { NavLink, Link, useHistory } from "react-router-dom";

function ProfileButton({ user }) {
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
      <button onClick={openMenu}>
        <i className="fas fa-user-circle" />
        {/* <i className="fas fa-duotone fa-square-user" /> */}
      </button>
      {showMenu && (
        <ul className="profile-dropdown">
          {/* <li>{user.username}</li> */}
          <li>{user.firstName}</li>
          {/* <li>{user.email}</li> */}
            <li>
            <Link to={`/spots/me`}>My Spots</Link>
            </li>
            <li>
            <Link to={`/spots/create`}>Create Spot</Link>
            </li>
            <li>
            <Link to={`/reviews/me`}>My Review</Link>
            </li>
          <li>
            <button onClick={logout}>Log Out</button>
          </li>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
