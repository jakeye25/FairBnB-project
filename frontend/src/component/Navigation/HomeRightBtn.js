// // frontend/src/components/Navigation/ProfileButton.js
// import React, { useState, useEffect } from "react";
// import { useDispatch } from 'react-redux';
// import * as sessionActions from '../../store/session';
// import { NavLink, Link } from "react-router-dom";
// import SignupFormModal from "../SignupFormPage";
// import LoginFormModal from "../LoginFormModal";



// function HomeRightBtn() {
//   const dispatch = useDispatch();
//   const [showMenu, setShowMenu] = useState(false);

//   const openMenu = () => {
//     if (showMenu) return;
//     setShowMenu(true);
//   };

//   useEffect(() => {
//     if (!showMenu) return;

//     const closeMenu = () => {
//       setShowMenu(false);
//     };

//     document.addEventListener('click', closeMenu);

//     return () => document.removeEventListener("click", closeMenu);
//   }, [showMenu]);

//   // const logout = (e) => {
//   //   e.preventDefault();
//   //   dispatch(sessionActions.logout());
//   // };

//   return (
//     <>
//       <button onClick={openMenu}>
//         <i className="fas fa-user-circle" />
//       </button>
//       {showMenu && (
//         <ul className="profile-dropdown">
//           {/* <li>{user.username}</li> */}
//           {/* <li>{user.firstName}</li> */}
//           {/* <li>{user.email}</li> */}
//             <div>
//             {/* <Link to={`/spots/me`}>My Spots</Link> */}
//             <LoginFormModal/>
//             </div>
//             <div>
//             {/* <Link to={`/spots/create`}>Create Spot</Link> */}
//             <SignupFormModal/>
//             </div>
//             {/* <li> */}
//             {/* <Link to={`/reviews/me`}>My Review</Link> */}
//             {/* </li> */}
//           {/* <li>
//             <button onClick={logout}>Log Out</button>
//           </li> */}
//         </ul>
//       )}
//     </>
//   );
// }

// export default HomeRightBtn;
