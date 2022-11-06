import { csrfFetch } from './csrf';

export const LOAD_OWNERBOOKINGS = "bookings/LOAD_OWNERBOOKINGS";
export const LOAD_SPOTBOOKINGS = "bookings/LOAD_SPOTBOOKINGS"


const loadownerbookings = (bookings) => ({
    type: LOAD_OWNERBOOKINGS,
    bookings
})

const loadospotbookings = (bookings) => ({
    type: LOAD_SPOTBOOKINGS,
    bookings
})


export const getOwnerBookings = () => async (dispatch) => {
    const response = await csrfFetch(`/api/users/current/bookings`);
    if (response.ok) {
        const data = await response.json();
        // console.log(spots)
        dispatch(loadownerbookings(data));
    }
};

export const getSpotBookings = () => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/:spotId/bookings`);
    if (response.ok) {
        const data = await response.json();
        // console.log(spots)
        dispatch(loadospotbookings(data));
    }
};

const initialState = {}
const bookingReducer =(state= initialState, action) => {
    let newState = {...state}
    switch (action.type) {
        case getOwnerBookings:
            newState={};
            action.Bookings.forEach((booking) => {
                newState[booking.id] = booking
            });
            return newState
        case getSpotBookings:
            newState={}
            action.Bookings.forEach((booking) => {
                newState[booking.id] = booking
            });
            return newState
        default:
            return state
    }
}

export default bookingReducer;
