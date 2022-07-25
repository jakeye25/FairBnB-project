import { csrfFetch } from './csrf';

const GETALL_SPOT = 'spot/getAllSpot';
const GETONE_SPOT = 'spot/getOneSpot';
const CREATE_SPOT = 'spot/createSpot';
const DELETE_SPOT = 'spot/deleteSpot';

const getallSpots = (spots) => {
  return {
    type: GETALL_SPOT,
    spots,
  };
};

const getoneSpot = (spot) => {
  return {
    type: GETONE_SPOT,
    spot,
  };
};

const setSpot = (spot) => {
  return {
    type: CREATE_SPOT,
    spot,
  };
};

const removeSpot = () => {
  return {
    type: DELETE_SPOT,
  };
};

export const getspots = () => async(dispatch) => {
  const response = await csrfFetch("/api/spots", {
    method: "GET",
    headers: { 'Content-Type': 'application/json' }
  });
  if(response.ok){
  const data = await response.json()
  dispatch(getallSpots(data))}
  else throw response
}

export const getspotDetail = (spotId) => async(dispatch) => {

  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: "GET",
    headers: { 'Content-Type': 'application/json' }
  });
  if(response.ok){
  const data = await response.json()
  dispatch(getoneSpot(data))}
  else throw response
}

// export const createspot = (spot) => async (dispatch) => {
//     const { email, firstName, lastName, password } = user;
//     const response = await csrfFetch("/api/users/signup", {
//       method: "POST",
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         email,
//         firstName,
//         lastName,
//         password,
//       }),
//     });
//     const data = await response.json();
//     dispatch(setUser(data));
//     return response;
//   };
//   // ...
//   export const logout = () => async (dispatch) => {
//     const response = await csrfFetch('/api/users', {
//       method: 'DELETE',
//       headers: { 'Content-Type': 'application/json' },
//     });
//     // console.log(response)
//     if(response.ok) {
//       dispatch(removeUser())
//     }
//     else throw response;
//   };

  const initialState = {spot: null};


const spotReducer = (state = initialState, action) => {
  let newState={...state};
  switch (action.type) {
    case GETALL_SPOT:

      newState = action.spots
      return newState;
    case REMOVE_USER:

      newState = initialState;
      return newState;
    default:
      return state;
  }
};

export default spotReducer;
