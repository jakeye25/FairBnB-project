import { csrfFetch } from './csrf';

export const LOAD_REVIEWS = "reviews/LOAD_REVIEWS";
export const LOAD_USERREVIEWS = "reviews/LOAD_USERREVIEWS"
export const LOAD_SPOTREVIEWS = "reviews/LOAD_SPOTREVIEWS"
export const UPDATE_REVIEW = "reviews/UPDATE_REVIEW";
export const REMOVE_REVIEW = "reviews/REMOVE_REVIEW";
export const ADD_REVIEW = "reviews/ADD_REVIEW";

const loadreviews = (reviews) => ({
    type: LOAD_REVIEWS,
    reviews
});

const loaduserreviews = (reviews) => ({
    type: LOAD_USERREVIEWS,
    reviews
  });

const loadspotreviews = (reviews) => ({
    type: LOAD_SPOTREVIEWS,
    reviews
  });

  const addreview = review => ({
    type: ADD_REVIEW,
    review
});

// const updatereview = (review) => ({
//     type: UPDATE_REVIEW,
//     review
//   });

  const removereview = (reviewId) => ({
    type: REMOVE_REVIEW,
    reviewId
});

export const getReviews = () => async (dispatch) => {
    const response = await csrfFetch("/api/reviews");
    // console.log('res', response)
    if(response.ok){
    const reviews = await response.json()
    // console.log(reviews)
    dispatch(loadreviews(reviews))}
  }

export const getUserReviews = () => async (dispatch) => {
    const response = await csrfFetch(`/api/users/current/reviews`);
    // console.log(response)
    if (response.ok) {
      const reviews = await response.json();
        // console.log("rev",reviews)
      dispatch(loaduserreviews(reviews.reviews));
    }
  };

export const getSpotReviews = (id) => async (dispatch) => {
    console.log('before fetch', id, typeof(id))
    const response = await csrfFetch(`/api/spots/${id}/reviews`);
    // console.log(response)
    if (response.ok) {
      const reviews = await response.json();
        // console.log("rev",reviews)
      dispatch(loadspotreviews(reviews));
    }
  };

//   export const createReview = data => async dispatch => {
//     try{
//       const response = await csrfFetch(`/api/spots/${spot.id}/reviews`, {
//         method: "POST",
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(data),
//       });
//       if(!response.ok){
//         let error;
//         let errorJSON;
//           error = await response.text();
//           try {
//             errorJSON = JSON.parse(error);
//           }
//           catch {
//             throw new Error(error);
//           }
//           throw new Error(`${errorJSON.title}: ${errorJSON.message}`);
//         }
//         const review = await response.json()
//         // console.log(data)
//         dispatch(addreview(review))
//         return review
//     }
//     catch (error) {
//       throw error;
//     }
//   };

  export const deleteReview= (reviewId) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
      method: 'delete',
    });
    if (response.ok) {
      dispatch(removereview(reviewId));
    }
  };

  const initialState = {};

  const reviewReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_REVIEWS:
        newState={};
      action.reviews.forEach(review => {
      newState[review.id] = review;
    })
    return newState;
    case LOAD_USERREVIEWS:
       newState = {};
      action.reviews.forEach(review => {
        newState[review.id] = review;
      })
      return newState;
      case LOAD_SPOTREVIEWS:
       newState = {};
      action.reviews.forEach(review => {
        newState[review.id] = review;
      })
      return newState;
      case REMOVE_REVIEW:
      newState = {...state}
      delete newState[action.reviewId];
      return newState;

        default:
      return state;
  }
};

export default reviewReducer;
