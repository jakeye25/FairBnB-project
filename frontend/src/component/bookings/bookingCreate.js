
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams} from 'react-router-dom'
import { createSpotBookings, getSpotBookings } from "../../store/booking";
import { getOneSpot } from "../../store/spot";


import './bookingCreate.css'

function BookingCreateFormPage() {
    const history = useHistory()
    const dispatch = useDispatch();
    const {spotId} = useParams()

    const currUser = useSelector((state) => state.session.user)
    const userId = currUser?.id
    const currSpot = useSelector((state) => state.spot[spotId])
    console.log('check spot==========', currSpot)
    const spotBookings = useSelector((state) => state.booking)
    console.log("check spotbooking", spotBookings)
    const spotBookingsArr = Object.values(spotBookings)
    console.log("========", spotBookingsArr)


    let today = new Date();

    let date=today.getFullYear()+ "-"+ parseInt(today.getMonth()+1) +"-"+today.getDate();

    let minStartDate = date
    let minEndDate = today.getFullYear() + "-"+ parseInt(today.getMonth()+1) +"-"+parseInt(today.getDate()+2);

    // console.log("today",date)
    // console.log("minenddate", minEndDate)
    useEffect(() => {
        dispatch(getSpotBookings(spotId))
    }, [dispatch])

    useEffect(() => {
        dispatch(getOneSpot(spotId))
      }, [dispatch]);

    const[startDate, setStartDate] = useState('')
    const[endDate, setEndDate] = useState('')
    // const [validations, setValidations] = useState(false);
    const [errors, setErrors] = useState([]);

    let day= new Date(startDate)
    let maxEndDate = day.getFullYear() + "-"+ parseInt(day.getMonth()+1) +"-"+parseInt(day.getDate()+6);
    //   console.log("check max end date", maxEndDate)
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

    const secondDate = new Date(endDate);

    const diffDays = Math.round(Math.abs((day - secondDate) / oneDay))
    //   console.log("check mix end date====", minEndDate)
    const handleSubmit = (e) => {
        e.preventDefault()
        setErrors([]);
        // console.log("====================", spotBookingsArr)
        const createPayload = {
            userId,
            spotId,
            startDate,
            endDate
        }

        for (let i of spotBookingsArr) {
            if (
                (new Date(startDate).toISOString().slice(0, 10) >= i.startDate ||
                new Date(endDate).toISOString().slice(0, 10) >= i.startDate) &&
                (i.endDate >= new Date(endDate).toISOString().slice(0, 10) ||
                i.endDate >= new Date(startDate).toISOString().slice(0, 10))
              ) {
                return setErrors(["Sorry, this spot is already booked for the specified dates"])
        }
    }

        if(createPayload?.startDate>=createPayload.endDate)
        return setErrors(['Please verify your selected date.'])

        if(currSpot?.ownerId == userId)
        return setErrors(["You can't book your spot."])

        // const checkingconflitdate = spotBookingsArr.filter(checkindate => checkindate?.startDate == startDate)
        // console.log('check conflit date', checkingconflitdate)
        // if (checkingconflitdate) setErrors(['confilt start date.'])

        let newBooking = dispatch(createSpotBookings(createPayload))
            .catch (async (res) => {
            const data = await res.json()
            // console.log("ressssssssssss", res)
            // if(res.status ==403) return setErrors(["chech"])
            let errors = []
            if (data && data.message) {
              errors.push(data.message)
            }
            setErrors(errors)
          })

            // .catch(async(res)=> {
            //     const data = await res.json()

            //     if (data && data.errors)  return setErrors(data.message)})

        if (newBooking) {history.push(`/mybookings`)}

    }

    return(
        <div className="create-booking-div" >
            <form className="bookingcreateform" onSubmit={handleSubmit}>
                <div className="bookingcreatedate-container">
                    <div className="bookingcreatedate-left">
                        <label className="bookingcreatedatetext">CHECK-IN</label>
                        <input
                        className="bookingcreatedateinput"
                        type='date'
                        placeholder="Add date"
                        value={startDate}
                        required
                        min={minStartDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        ></input>
                    </div>
                    <div className="bookingcreatedate-right">
                        <label className="bookingcreatedatetext">CHECK-OUT</label>
                        <input
                        className="bookingcreatedateinput"
                        type='date'
                        value={endDate}
                        required
                        placeholder="Add date"
                        min={minEndDate}
                        max={maxEndDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        ></input>
                    </div>
                </div>
                {errors.length > 0 &&
                    errors.map((error) => <div key={error} className='create_booking_errortext'>{error}</div>)}
                <button type="submit" className="bookingformbutton__btn">Reserve</button>
                <div>
                    <div>
                        <div className='fee-container'>
                            <div className='fee-containertext'>${currSpot?.price}x{diffDays? diffDays:1}&nbsp;nights</div>
                            <div ></div>
                        </div >
                        <div className='fee-containertext'>${currSpot?.price * (diffDays? diffDays:1)}</div>
                    </div>
                    <div className='fee-container'>
                        <div className='fee-containertext'>Cleaning fee</div>
                        <div className='fee-containertext'>$80</div>
                    </div>
                    <div className='fee-container'>
                        <div className='fee-containertext'>Service fee</div>
                        <div className='fee-containertext'>${((currSpot?.price * (diffDays? diffDays:1))*0.15).toFixed(0)}</div>
                    </div>
                    <div className='fee-container1'>
                        <div className='fee-containertotaltext'>Total before taxes</div>
                        <div className='fee-containertotaltext'>${(currSpot?.price * (diffDays? diffDays:1)+ 80 + Number.parseFloat((currSpot?.price * (diffDays? diffDays:1))*0.15)).toFixed(0)}</div>
                    </div>
                </div>

            </form>
        </div>
    )

}

export default BookingCreateFormPage;
