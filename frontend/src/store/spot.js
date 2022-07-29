import { csrfFetch } from './csrf';


export const LOAD_SPOTS = "spots/LOAD_SPOTS";
export const LOAD_OWNERSPOTS = "spots/LOAD_OWNERSPOTS"
export const LOAD_ONESPOT = "spots/LOAD_ONESPOT"
export const UPDATE_SPOT = "spots/UPDATE_SPOT";
export const REMOVE_SPOT = "spots/REMOVE_SPOT";
export const ADD_SPOT = "spots/ADD_SPOT";

const loadspots = (spots) => ({
    type: LOAD_SPOTS,
    spots,
});

const loadownerspots = (spots) => ({
  type: LOAD_OWNERSPOTS,
  spots,
});

const loadoneSpot = (spot) => ({
    type: LOAD_ONESPOT,
      spot
});

const add = spot => ({
    type: ADD_SPOT,
    spot
});

const update = (spot) => ({
  type: UPDATE_SPOT,
  spot
});

const remove= (spotId) => ({
    type: REMOVE_SPOT,
    spotId
});

export const getSpots = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots");
  if(response.ok){
  const spots = await response.json()
  dispatch(loadspots(spots.Spot))}
}

export const getOneSpot = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`);
  if(response.ok){
  const spot = await response.json()
    // console.log('res', spot)
  dispatch(loadoneSpot(spot))}
}

export const getOwnerSpots = () => async (dispatch) => {
  const response = await csrfFetch(`/api/users/current/spots`);
  if (response.ok) {
    const spots = await response.json();
    // console.log(spots)
    dispatch(loadownerspots(spots));
  }
};

export const createSpot = data => async dispatch => {
  try{
    const response = await csrfFetch("/api/spots", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if(!response.ok){
      let error;
      let errorJSON;
        error = await response.text();
        try {

          errorJSON = JSON.parse(error);
        }
        catch {
          throw new Error(error);
        }
        throw new Error(`${errorJSON.title}: ${errorJSON.message}`);
      }

      const spot = await response.json()
      // console.log(data)
      dispatch(add(spot))

      return spot
  }
  catch (error) {
    throw error;
  }
};

  export const updateSpot = (spot) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spot.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(spot)
    });
    console.log('res',response)
    if (response.ok) {
      const data = await response.json();
      // console.log('lll', spot)
      dispatch(update(data));
      return data;
    }
  };

  export const deleteSpot= (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
      method: 'delete',
    });
    if (response.ok) {
      dispatch(remove(spotId));
    }
  };

  const initialState = {};

  // const sortList = (list) => {
  //   return list.sort((spotA, spotB) => {
  //     return spotA.number - spotB.number;
  //   }).map((spot) => spot.id);
  // };

const spotReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case LOAD_SPOTS:
    newState={};
      action.spots.forEach(spot => {
      newState[spot.id] = spot;
    })
    return newState;
    case LOAD_OWNERSPOTS:
       newState = {};
      action.spots.forEach(spot => {
        newState[spot.id] = spot;
      })
      return newState;
      case LOAD_ONESPOT:
        newState = {...state}
        newState[action.spot.id] = action.spot
      return newState;
    case ADD_SPOT:
      newState = { ...state, [action.spot.id]: action.spot }
                return newState;
      case UPDATE_SPOT:
        newState={...state}
        // console.log('ns', newState)
          newState[action.spot.id] = action.spot
        return newState;
    case REMOVE_SPOT:
      newState = {...state}
      delete newState[action.spotId];
      return newState;
    default:
      return state;
  }
};

export default spotReducer;


// export const getOneSpot = spotId => async dispatch => {

//   const response = await csrfFetch(`/api/spots/${spotId}`, {
//     method: "GET",
//     headers: { 'Content-Type': 'application/json' }
//   });
//   if(response.ok){
//   const data = await response.json()
//   dispatch(getoneSpot(data.Spot))}
// }
