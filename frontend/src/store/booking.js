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
    console.log('checking for ownerbooking response', response)
    if (response.ok) {
        const data = await response.json();
        console.log("ownerbooking", data)
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
        case LOAD_OWNERBOOKINGS:
            newState={};
            console.log('actionbooking', action.Bookings)
            action.bookings.Bookings.forEach((booking) => {

                newState[booking.id] = booking;

            });
            console.log('newState',newState)
            return newState
        case LOAD_SPOTBOOKINGS:
            newState={}
            action.bookings.Bookings.forEach((booking) => {
                newState[booking.id] = booking
            });
            return newState
        default:
            return state
    }
}

export default bookingReducer;
