import { csrfFetch } from './csrf';

export const LOAD_OWNERBOOKINGS = "bookings/LOAD_OWNERBOOKINGS";
export const LOAD_SPOTBOOKINGS = "bookings/LOAD_SPOTBOOKINGS"
export const CREATE_SPOTBOOKINGS = "bookings/CREATE_SPOTBOOKINGS"
export const EDIT_SPOTBOOKINGS = "bookings/EDIT_SPOTBOOKINGS"
export const DELETE_SPOTBOOKINGS = "bookings/DELETE_SPOTBOOKINGS"

const loadownerbookings = (bookings) => ({
    type: LOAD_OWNERBOOKINGS,
    bookings
})

const loadospotbookings = (bookings) => ({
    type: LOAD_SPOTBOOKINGS,
    bookings
})

const createspotbookings = (booking) => ({
    type: CREATE_SPOTBOOKINGS,
    booking
})


const editspotbookings = (booking) => {
    return {
        type: EDIT_SPOTBOOKINGS,
        booking
    }
}

const deletespotbookings = (id) => {
    return {
        type: DELETE_SPOTBOOKINGS,
        id
    }
}

export const getOwnerBookings = () => async (dispatch) => {
    const response = await csrfFetch(`/api/users/current/bookings`);
    // console.log('checking for ownerbooking response', response)
    if (response.ok) {
        const data = await response.json();
        console.log("ownerbooking", data)
        dispatch(loadownerbookings(data));
    }
};

export const getSpotBookings = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${id}/bookings`);
    if (response.ok) {
        const data = await response.json();
        // console.log(spots)
        dispatch(loadospotbookings(data));
    }
};

export const createSpotBookings = (payload) => async dispatch => {
    // console.log("before fetching", payload)
    const response = await csrfFetch(`/api/spots/${payload.spotId}/bookings`, {
        method: "POST",
        // headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });
    console.log("checking response", response)
    if (response.ok) {
        const data = await response.json()
        dispatch(editspotbookings(data))
        return data
    }
}

export const editSpotBookings = (payload) => async dispatch => {
    // console.log("before fetching", payload)
    const response = await csrfFetch(`/api/bookings/${payload.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });
    console.log("checking response", response)
    if (response.ok) {
        const data = await response.json()
        dispatch(editspotbookings(data))
        return data
    }
}

export const deleteSpotBookings = (id) => async dispatch => {
    const response = await csrfFetch(`/api/bookings/${id}`, {
        method: 'delete',
    });
    if (response.ok) {
        dispatch(deletespotbookings(id));
    }
};


const initialState = {}
const bookingReducer = (state = initialState, action) => {
    let newState = { ...state }
    switch (action.type) {
        case LOAD_OWNERBOOKINGS:
            newState = {};
            // console.log('actionbooking', action.Bookings)
            action.bookings.Bookings.forEach((booking) => {

                newState[booking.id] = booking;

            });
            // console.log('newState',newState)
            return newState
        case LOAD_SPOTBOOKINGS:
            newState = {}
            action.bookings.Bookings.forEach((booking) => {
                newState[booking.id] = booking
            });
            return newState
        case CREATE_SPOTBOOKINGS:
            newState[action.booking.id] = action.booking
            return newState
        case EDIT_SPOTBOOKINGS:
            newState[action.booking.id] = action.booking
            return newState
        case DELETE_SPOTBOOKINGS:
            newState = {...state}
            delete newState[action.id];
            return newState;
        default:
            return state
    }
}

export default bookingReducer;
