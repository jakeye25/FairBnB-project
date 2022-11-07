import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { getOwnerBookings } from "../../store/booking";

function MyBookingListing() {
    const dispatch = useDispatch()
    const user =useSelector((state) => state.session.user)
    const userBookings = useSelector((state) => state.booking)
    console.log('userbookings', userBookings)
    const userBookingsArr = Object.values(userBookings)
    console.log('userbookingsArr', userBookingsArr)



    useEffect(() => {
        dispatch(getOwnerBookings())
    }, [dispatch])

    if(!userBookingsArr.length) return(<div>
        You don't have any booking now
    </div>)

    return(


        <div className="mybookings-container">
            <div>My spot booking</div>
                {userBookingsArr?.map((booking,i) =>(
                    <div key={i}>

                        {/* <div>{booking}</div> */}
                        <img
                        src={booking?.Spot?.previewImage}
                        alt='pic'
                        onError={e => { e.currentTarget.src = "https://filestore.community.support.microsoft.com/api/images/ext?url=https%3A%2F%2Fanswersstaticfilecdnv2.azureedge.net%2Fstatic%2Fimages%2Fimage-not-found.jpg"; }}
                        ></img>
                        <div>{booking?.Spot?.name}</div>
                        <div>{booking?.Spot?.price}</div>
                        <div>{booking?.startDate}</div>
                        <div>{booking?.endDate}</div>
                    </div>
            ))}

        </div>

    )


}

export default MyBookingListing;
