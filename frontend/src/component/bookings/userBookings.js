import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import { getOwnerBookings } from "../../store/booking";
import BookingDeleteFormModal from "./bookingDelete";


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
    <div id ='userspot-container'>
        <h1 id="userspot-listing"> My Bookings</h1>
        <h2 id="spotlist__nospot">Please check out our spots to start booking.</h2>
  </div>)

    return(


        <div className="userspot-container">
            <h1 id="userspot-listing">My Booking</h1>
                {userBookingsArr?.map((booking,i) =>(
                    <div key={i} id='userspot__ind-container'>

                        {/* <div>{booking}</div> */}
                        <Link id="userspotimg__container" to={`/spots/${booking?.Spot?.spotId}`}>
                            <img
                            src={booking?.Spot?.previewImage}
                            alt='pic'
                            onError={e => { e.currentTarget.src = "https://filestore.community.support.microsoft.com/api/images/ext?url=https%3A%2F%2Fanswersstaticfilecdnv2.azureedge.net%2Fstatic%2Fimages%2Fimage-not-found.jpg"; }}
                            ></img>
                        </Link>
                        <div id="userspot__rightcontainer">
                            <div id="userspot__textline1">{booking?.Spot?.name}</div>
                            <div className="userspot__container1">{booking?.Spot?.price}</div>
                            <div className="userspot__container1">{booking?.startDate}</div>
                            <div className="userspot__container1">{booking?.endDate}</div>
                            <div>Edit</div>
                            {/* <button className="userspotbtn" onClick={() => dispatch(spotActions.deleteSpot(spot.id))}> */}
                            { date < booking?.startDate ?
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
