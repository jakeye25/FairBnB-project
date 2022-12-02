import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import { getOwnerBookings } from "../../store/booking";
import BookingDeleteFormModal from "./bookingDelete";
import BookingEditFormModal from "./bookingEdit";
import './userBookings.css'

function MyBookingListing() {
    const dispatch = useDispatch()
    const user =useSelector((state) => state.session.user)
    const userBookings = useSelector((state) => state.booking)
    console.log('userbookings', userBookings)
    const userBookingsArr = Object.values(userBookings)
    console.log('userbookingsArr', userBookingsArr)

    let today = new Date();
    let date=today.getFullYear()+ "-"+ parseInt(today.getMonth()+1) +"-"+today.getDate();

    useEffect(() => {
        dispatch(getOwnerBookings())
    }, [dispatch])

    if(!userBookingsArr.length) return(
    <div className ='userbooking-container'>
        <h1 id="userbooking-listing"> My Bookings</h1>
        <h2 id="bookinglist__nobooking">Please check out our spots to start booking.</h2>
  </div>)

    return(


        <div className="userbooking-container">
            <h1 id="userbooking-listing">My Booking</h1>
                {userBookingsArr?.map((booking,i) =>(
                    <div key={i} id='userbooking__ind-container'>

                        {/* <div>{booking}</div> */}
                        <Link id="userbookingimg__container" to={`/spots/${booking?.Spot?.spotId}`}>
                            <img
                            src={booking?.Spot?.previewImage}
                            alt='pic'
                            onError={e => { e.currentTarget.src = "https://filestore.community.support.microsoft.com/api/images/ext?url=https%3A%2F%2Fanswersstaticfilecdnv2.azureedge.net%2Fstatic%2Fimages%2Fimage-not-found.jpg"; }}
                            ></img>
                        </Link>
                        <div id="userbooking__rightcontainer">
                            <div id="userbooking__textline1">{booking?.Spot?.name}</div>
                            <div className="userbooking__container1">{booking?.Spot?.description}</div>
                            <div className="userbooking__container1">Check in: {booking?.startDate}</div>
                            <div className="userbooking__container1">Check out: {booking?.endDate}</div>
                            { date < booking?.startDate ?
                            <div><BookingEditFormModal booking={booking}/></div>
                            : <div>You can't edit past booking.</div>}
                            {/* <button className="userspotbtn" onClick={() => dispatch(spotActions.deleteSpot(spot.id))}> */}
                            { (date < booking?.startDate) ?
                                <div><BookingDeleteFormModal booking={booking}/></div>
                            : <div></div>}
                            {/* </button> */}
                        </div>
                    </div>
            ))}

        </div>

    )


}

export default MyBookingListing;
