// // frontend/src/components/LoginFormModal/LoginForm.js
// import React, { useState } from "react";
// import * as spotActions from "../../store/spot";
// import { useDispatch } from "react-redux";

// function showSpots() {
//     const dispatch = useDispatch();
//     const spots = useSelector(state => Object.values(state.spots));

//     const resetBookData = (e) => {
//         e.preventDefault();
//         dispatch(spotActions.getspots());
//       };

//       return (
//         <section>
//           <ul>
//             {
//               spots.map(spot => (
//                 <BookIndexItem
//                   book={book}
//                   key={book.id}
//                 />
//               ))
//             }
//           </ul>

//         </section>
//       );

// }

// function LoginForm() {
//   const dispatch = useDispatch();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errors, setErrors] = useState([]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setErrors([]);
//     return dispatch(sessionActions.login({ email, password })).catch(
//       async (res) => {
//         const data = await res.json();
//         if (data && data.errors) setErrors(data.errors);
//       }
//     );
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <ul>
//         {errors.map((error, idx) => (
//           <li key={idx}>{error}</li>
//         ))}
//       </ul>
//       <label>
//         Email
//         <input
//           type="text"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//       </label>
//       <label>
//         Password
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//       </label>
//       <button type="submit">Log In</button>
//     </form>
//   );
// }

// export default LoginForm;
