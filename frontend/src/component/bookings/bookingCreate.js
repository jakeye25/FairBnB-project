
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from 'react-router-dom'
import { createSpotBookings, getOwnerBookings, getSpotBookings } from "../../store/booking";
import { getOneSpot } from "../../store/spot";


import './bookingCreate.css'

function BookingCreateFormPage() {
    const history = useHistory()
    const dispatch = useDispatch();
    const { spotId } = useParams()

    const currUser = useSelector((state) => state.session.user)
    const userId = currUser?.id
    const currSpot = useSelector((state) => state.spot[spotId])
    // console.log('check spot==========', currSpot)
    const spotBookings = useSelector((state) => state.booking)
    // console.log("check spotbooking", spotBookings)
    const spotBookingsArr = Object.values(spotBookings)
    // console.log("========", spotBookingsArr)
    const review = useSelector((state) => state.review)
    const numReivewsArray = Object.values(review).filter(ele => ele.spotId == spotId)
    const numReivews = numReivewsArray.length

    let today = new Date();

    if (parseInt(today.getDate()) >= 10 && (today.getMonth() + 1) >= 10) {

        var minStartDate = today.getFullYear() + "-" + parseInt(today.getMonth() + 1) + "-" + today.getDate();

    } else if (parseInt(today.getDate()) >= 10 && (today.getMonth() + 1) < 10) {
        var minStartDate = today.getFullYear() + "-0" + parseInt(today.getMonth() + 1) + "-" + today.getDate();

    } else if (parseInt(today.getDate()) < 10 && (today.getMonth() + 1) >= 10) {
        var minStartDate = today.getFullYear() + "-" + parseInt(today.getMonth() + 1) + "-0" + today.getDate()

    } else if (parseInt(today.getDate()) < 10 && (today.getMonth() + 1) < 10) {
        var minStartDate = today.getFullYear() + "-0" + parseInt(today.getMonth() + 1) + "-0" + today.getDate()

    }




// if (parseInt(today.getDate()) >= 8) {
//     var minEndDate = today.getFullYear() + "-" + parseInt(today.getMonth() + 1) + "-" + parseInt(today.getDate() + 2);
// } else {
//     var minEndDate = today.getFullYear() + "-" + parseInt(today.getMonth() + 1) + "-0" + parseInt(today.getDate() + 2);
// }


// console.log("today",date)
useEffect(() => {
    dispatch(getSpotBookings(spotId))
}, [dispatch])

useEffect(() => {
    dispatch(getOneSpot(spotId))
}, [dispatch]);

const [startDate, setStartDate] = useState('')
const [endDate, setEndDate] = useState('')
// const [validations, setValidations] = useState(false);
const [errors, setErrors] = useState([]);

let day = new Date(startDate)
// let maxEndDate = day.getFullYear() + "-" + parseInt(day.getMonth() + 1) + "-" + parseInt(day.getDate() + 6);

if(startDate) {
    let date_selectDate = new Date(startDate)

    if (parseInt(date_selectDate.getDate()) == (30||31) && (date_selectDate.getMonth() + 1) >= 9){
        var minEndDate = date_selectDate.getFullYear() + "-" + parseInt(date_selectDate.getMonth() + 2) + "-" + parseInt(date_selectDate.getDate() + 2);
        var maxEndDate = date_selectDate.getFullYear() + "-" + parseInt(date_selectDate.getMonth() + 2) + "-" + parseInt(date_selectDate.getDate() + 6);
    }
    else if (parseInt(date_selectDate.getDate()) == (30||31) && (date_selectDate.getMonth() + 1) < 9){
        var minEndDate = date_selectDate.getFullYear() + "-0" + parseInt(date_selectDate.getMonth() + 2) + "-" + parseInt(date_selectDate.getDate() + 2);
        var maxEndDate = date_selectDate.getFullYear() + "-0" + parseInt(date_selectDate.getMonth() + 2) + "-" + parseInt(date_selectDate.getDate() + 6);
    }
    else if (parseInt(date_selectDate.getDate()) >= 8 && (date_selectDate.getMonth() + 1) >= 10) {
        var minEndDate = date_selectDate.getFullYear() + "-" + parseInt(date_selectDate.getMonth() + 1) + "-" + parseInt(date_selectDate.getDate() + 2);
    } else if (parseInt(date_selectDate.getDate()) >= 8 && (date_selectDate.getMonth() + 1) < 10) {
        var minEndDate = date_selectDate.getFullYear() + "-0" + parseInt(date_selectDate.getMonth() + 1) + "-" + parseInt(date_selectDate.getDate() + 2);
    } else if (parseInt(date_selectDate.getDate()) < 8 && (date_selectDate.getMonth() + 1) >= 10) {
        var minEndDate = date_selectDate.getFullYear() + "-" + parseInt(date_selectDate.getMonth() + 1) + "-0" + parseInt(date_selectDate.getDate() + 2);
    } else if (parseInt(date_selectDate.getDate()) < 8 && (date_selectDate.getMonth() + 1) < 10){
        var minEndDate = date_selectDate.getFullYear() + "-0" + parseInt(date_selectDate.getMonth() + 1) + "-0" + parseInt(date_selectDate.getDate() + 2);
    }

    if (parseInt(date_selectDate.getDate()) >= 4 && (date_selectDate.getMonth() + 1) >= 10) {
        var maxEndDate = date_selectDate.getFullYear() + "-" + parseInt(date_selectDate.getMonth() + 1) + "-" + parseInt(date_selectDate.getDate() + 6);
    } else if (parseInt(date_selectDate.getDate()) >= 4 && (date_selectDate.getMonth() + 1) < 10) {
        var maxEndDate = date_selectDate.getFullYear() + "-0" + parseInt(date_selectDate.getMonth() + 1) + "-" + parseInt(date_selectDate.getDate() + 6);
    } else if (parseInt(date_selectDate.getDate()) < 4 && (date_selectDate.getMonth() + 1) >= 10) {
        var maxEndDate = date_selectDate.getFullYear() + "-" + parseInt(date_selectDate.getMonth() + 1) + "-0" + parseInt(date_selectDate.getDate() + 6);
    } else if (parseInt(date_selectDate.getDate()) < 4 && (date_selectDate.getMonth() + 1) < 10){
        var maxEndDate = date_selectDate.getFullYear() + "-0" + parseInt(date_selectDate.getMonth() + 1) + "-0" + parseInt(date_selectDate.getDate() + 6);
    }
}
// console.log("check max end date", typeof (maxEndDate))
// console.log("check compare date str", "2020-1-09" > "2020-1-08")
// console.log("check min end date", minEndDate)
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

    if (createPayload?.startDate >= createPayload.endDate)
        return setErrors(['Please verify your selected date.'])

    if (currSpot?.ownerId == userId)
        return setErrors(["You can't book your spot."])

    // const checkingconflitdate = spotBookingsArr.filter(checkindate => checkindate?.startDate == startDate)
    // console.log('check conflit date', checkingconflitdate)
    // if (checkingconflitdate) setErrors(['confilt start date.'])

    let newBooking = dispatch(createSpotBookings(createPayload))
        .catch(async (res) => {
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

    if (newBooking) {
        history.push(`/mybookings`)
        dispatch(getOwnerBookings())
    }

}

return (
    <div className="create-booking-div" >
        <form className="bookingcreateform" onSubmit={handleSubmit}>
            <div id='sd-boxhead'>
                <div id='sd-boxheadleft'>
                    <span id='sd-bookingprice'>${currSpot.price}</span>
                    <span id='sd-bookingnight'>night</span>
                </div>
                <div id='sd-boxheadrught'>
                    <i className="fa-solid fa-star"></i>
                    <span id='sd-boxrating'>
                        {currSpot.avgStarRating ? currSpot.avgStarRating.toFixed(2) : '0.00'} </span>
                    <span > · </span>
                    <span id='sd-boxreviews'>{numReivews} reviews </span>
                </div>
            </div>
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
            {currUser ?
                <button type="submit" className="bookingformbutton__btn">Reserve</button>
                :
                <div className="bookingformbutton__btn"
                    onClick={() => { alert('You have to login or signup first.') }}>Reserve</div>
            }
            <div className="not-charge-text">You won't be charged yet</div>
            <div>
                <div>
                    <div className='fee-container'>
                        <div className='fee-containertext'>${currSpot?.price}x{diffDays ? diffDays : 1}&nbsp;nights</div>

                        <div className='fee-containertext'>${currSpot?.price * (diffDays ? diffDays : 1)}</div>
                    </div >
                </div>
                <div className='fee-container'>
                    <div className='fee-containertext'>Cleaning fee</div>
                    <div className='fee-containertext'>$80</div>
                </div>
                <div className='fee-container'>
                    <div className='fee-containertext'>Service fee</div>
                    <div className='fee-containertext'>${((currSpot?.price * (diffDays ? diffDays : 1)) * 0.15).toFixed(0)}</div>
                </div>
                <div className='fee-containertotal'>
                    <div className='fee-containertotaltext'>Total before taxes</div>
                    <div className='fee-containertotaltext'>${(currSpot?.price * (diffDays ? diffDays : 1) + 80 + Number.parseFloat((currSpot?.price * (diffDays ? diffDays : 1)) * 0.15)).toFixed(0)}</div>
                </div>
            </div>

        </form>
    </div>
)

}

export default BookingCreateFormPage;
