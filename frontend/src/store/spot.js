import { csrfFetch } from './csrf';
import { useParams } from 'react-router-dom'

const GETALL_SPOT = 'spot/getAllSpot';
// const GETONE_SPOT = 'spot/getOneSpot';
const CREATE_SPOT = 'spot/createSpot';
const EDIT_SPOT = 'spot/editSpot'
const DELETE_SPOT = 'spot/deleteSpot';

const getallSpots = (spots) => {
  return {
    type: GETALL_SPOT,
    payload: spots,
  };
};

// const getoneSpot = (spot) => {
//   return {
//     type: GETONE_SPOT,
//     spot,
//   };
// };

// const setSpot = (spot) => {
//   return {
//     type: CREATE_SPOT,
//     payload: spot,
//   };
// };

// export const removeSpot = (spotId) => {
//   return {
//     type: DELETE_SPOT,
//     spotId
//   };
// };

export const getspots = () => async(dispatch) => {
  const response = await csrfFetch("/api/spots", {
    method: "GET",
    headers: { 'Content-Type': 'application/json' }
  });
  if(response.ok){
  const data = await response.json()
  // console.log(data.Spot)
  await dispatch(getallSpots(data.Spot))}
  else throw response
}

// export const getspotDetail = (spotId) => async(dispatch) => {

//   const response = await csrfFetch(`/api/spots/${spotId}`, {
//     method: "GET",
//     headers: { 'Content-Type': 'application/json' }
//   });
//   if(response.ok){
//   const data = await response.json()
//   dispatch(getoneSpot(data))}
//   else throw response
// }

// export const createspot = (spot) => async (dispatch) => {
//   let { address, city, state, country, lat, lng, name, description, price } = spot;
//     const response = await csrfFetch("/api/spots", {
//       method: "POST",
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ address, city, state, country, lat, lng, name, description, price }),
//     });
//     const data = await response.json();
//     dispatch(setSpot(data));
//     return response;
//   };
// //   // ...
//   export const deletespot = () => async (dispatch) => {
//     const{spotId} = useParams()
//     const response = await csrfFetch(`/api/spots/${spotId}`, {
//       method: 'DELETE',
//       headers: { 'Content-Type': 'application/json' },
//     });
//     console.log(response)
//     if(response.ok) {
//       dispatch(removeSpot())
//     }
//     else throw response;
  // };

  const initialState = {};


const spotReducer = (state = initialState, action) => {
  let newState={};
  switch (action.type) {
    case GETALL_SPOT:

    action.payload.forEach(spot => {
      newState[spot.id] = spot
    })

    return newState
    // case GETONE_SPOT:
    //   // console.log(action)
    //   newState = initialState;
    //   return newState;
    // case CREATE_SPOT:
    //   newState[action.spot.id] = action.spot
    //   return newState
    // case DELETE_SPOT:
    //     // console.log('action', action)
    //   delete newState[action.id]
    //         return newState
    default:
      return state;
  }
};

export default spotReducer;
