import { csrfFetch } from './csrf';


export const LOAD_SPOTS = "spots/LOAD_SPOTS";
export const LOAD_OWNERSPOTS = "spots/LOAD_OWNERSPOTS"
export const UPDATE_SPOT = "spots/UPDATE_SPOT";
export const REMOVE_SPOT = "spots/REMOVE_SPOT";
export const ADD_SPOT = "spots/ADD_SPOT";

const loadspots = spots => ({
    type: LOAD_SPOTS,
    spots,
});

const loadownerspots = (spots, ownerId) => ({
  type: LOAD_OWNERSPOTS,
  spots,
  ownerId
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

const remove= spotId => ({
    type: REMOVE_SPOT,
    spotId
});

export const getSpots = () => async dispatch => {
  const response = await csrfFetch("/api/spots", {
    method: "GET",
    headers: { 'Content-Type': 'application/json' }
  });
  console.log(response)
  if(response.ok){
  const data = await response.json()
  // console.log(data)
  await dispatch(loadspots(data.Spot))}

}

// export const getOneSpot = spotId => async dispatch => {

//   const response = await csrfFetch(`/api/spots/${spotId}`, {
//     method: "GET",
//     headers: { 'Content-Type': 'application/json' }
//   });
//   if(response.ok){
//   const data = await response.json()
//   dispatch(getoneSpot(data.Spot))}
// }

export const createSpot = data => async dispatch => {
  try{
  // let { address, city, state, country, lat, lng, name, description, price } = spot;
    const response = await csrfFetch("/api/spots", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    // if(response.ok) {
    // const data = await response.json();
    // await dispatch(setSpot(data.Spot))};
    // else throw response
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
  export const updateSpot = data => async dispatch => {
    const response = await csrfFetch(`/api/spots/${data.id}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      const spot = await response.json();
      console.log(spot)
      dispatch(update(spot));
      return spot;
    }
  };

  export const deleteSpot= (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
      method: 'delete',
    });

    if (response.ok) {
      const { id: deletedSpotId } = await response.json();
      dispatch(remove(deletedSpotId));
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

  switch (action.type) {
    case LOAD_SPOTS:
    const allSpots={}
    action.spots.forEach(spot => {
      allSpots[spot.id] = spot
    })

    return {
      ...allSpots,
      ...state,
      spot: sortList(action.spots)
    };
    // case GETONE_SPOT:
    //   // console.log(action)
    //   newState = initialState;
    //   return newState;
    case ADD_SPOT:
      // console.log('action', action.payload)
      // newState.spot = action.spot
      // return newState
      if (!state[action.spot.id]) {
        const newState = {
          ...state,
          [action.spot.id]: action.spot
        };
        const spotList = newState.list.map(id => newState[id]);
        spotList.push(action.spot);
        newState.list = sortList(spotList);
        return newState;
      }
      return {
        ...state,
        [action.spot.id]: {
          ...state[action.spot.id],
          ...action.spot
        }
      };
      case UPDATE_SPOT:
        return {
          ...state,
          [action.spot.id]: action.spot
        };

    // case DELETE_SPOT:
    //     // console.log('action', action)
    //   delete newState[action.id]
    //         return newState
    default:
      return state;
  }
};

export default spotReducer;
