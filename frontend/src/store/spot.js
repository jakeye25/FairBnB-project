import { csrfFetch } from './csrf';


export const LOAD_SPOTS = "spots/LOAD_SPOTS";
export const LOAD_OWNERSPOTS = "spots/LOAD_OWNERSPOTS"
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

// const getoneSpot = (spot) => {
//   return {
//     type: GETONE_SPOT,
//     spot,
//   };
// };

const add = spot => ({
    type: ADD_SPOT,
    spot
});

const update = (spot) => ({
  type: UPDATE_SPOT,
  spot
});

const remove= (spotId, ownerId) => ({
    type: REMOVE_SPOT,
    spotId,
    ownerId
});

export const getSpots = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots");
  if(response.ok){
  const spots = await response.json()
  dispatch(loadspots(spots.Spot))}

}

export const getOwnerSpots = () => async (dispatch) => {
  const response = await csrfFetch(`/api/users/current/spots`);
  if (response.ok) {
    const spots = await response.json();
    console.log(spots)
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
          // Check if the error is JSON, i.e., from the Pokemon server. If so,
          // don't throw error yet or it will be caught by the following catch
          errorJSON = JSON.parse(error);
        }
        catch {
          // Case if server could not be reached
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

  export const updateSpot = data => async dispatch => {
    const response = await csrfFetch(`/api/spots/${data.Id}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    // console.log(data)
    if (response.ok) {
      const spot = await response.json();
      console.log(spot)
      dispatch(update(spot));
      return spot;
    }
  };

  export const deleteSpot= (spotId, ownerId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
      method: 'delete',
    });

    if (response.ok) {
      const { id: deletedSpotId } = await response.json();
      dispatch(remove(deletedSpotId, ownerId));
      return deletedSpotId;
    }
  };

  const initialState = {};

  const sortList = (list) => {
    return list.sort((spotA, spotB) => {
      return spotA.number - spotB.number;
    }).map((spot) => spot.id);
  };

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
    // case ADD_SPOT:
    //   // console.log('action', action.payload)
    //   // newState.spot = action.spot
    //   // return newState
    //   newState={}
    //     const spotList = newState.list.map(id => newState[id]);
    //     spotList.push(action.spot);
    //     newState.list = sortList(spotList);
    //     return newState;
    //   }
    //   return {
    //     ...state,
    //     [action.spot.id]: {
    //       ...state[action.spot.id],
    //       ...action.spot
    //     }
    //   };
      case UPDATE_SPOT:
        return {
          ...state,
          [action.spot.id]: action.spot
        };

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
