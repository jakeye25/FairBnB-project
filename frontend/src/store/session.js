// frontend/src/store/session.js
import { csrfFetch } from './csrf';

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

const setUser = (user) => {
  return {
    type: SET_USER,
    user,
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

export const login = (user) => async (dispatch) => {
  const { email, password } = user;
  const response = await csrfFetch('/api/users/login', {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
    }),
  });
  const data = await response.json();
//   console.log(data)
  dispatch(setUser(data));
  return response;
};

// ...
export const restoreUser = () => async dispatch => {
    const response = await csrfFetch('/api/users/current');
    if(response.ok) {
    const data = await response.json();
    // console.log(data)
    dispatch(setUser(data));
    return response;
    }
  };
  // ...
  // ...
export const signup = (user) => async (dispatch) => {
    const { email, firstName, lastName, password } = user;
    const response = await csrfFetch("/api/users/signup", {
      method: "POST",
      body: JSON.stringify({
        email,
        firstName,
        lastName,
        password,
      }),
    });
    const data = await response.json();
    dispatch(setUser(data));
    return response;
  };
  // ...
  export const logout = () => async (dispatch) => {
    const response = await csrfFetch('/api/users/current', {
      method: 'DELETE',
      body: null
    });
    // console.log(response)
    dispatch(removeUser());
    return response;
  };


const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  let newState={...state};
  switch (action.type) {
    case SET_USER:

      newState.user = action.user
      return newState;
    case REMOVE_USER:

      newState.user = null;
      return newState;
    default:
      return state;
  }
};

export default sessionReducer;
