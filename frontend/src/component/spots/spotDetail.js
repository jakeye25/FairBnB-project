import React from 'react';
import { useEffect, useState } from "react";
import { NavLink, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOneSpot } from '../../store/spot';
import SpotReviews from '../reviews/spotReviews';
// import ReviewCreateModal from '../reviews/reviewCreateModal';
import ReviewCreateFormPage from '../reviews/reviewCreate'
// import { getSpotReviews } from '../../store/review';
import './spotDetail.css';
import BookingCreateFormPage from '../bookings/bookingCreate';
import MapContainersd from '../Maps';

const SpotDetail = () => {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const [isLoaded, setIsloaded] = useState(false)
  const user = useSelector((state) => state.session.user)
  const spot = useSelector((state) => state.spot[spotId])
  const review = useSelector((state) => state.review)
  const numReivewsArray = Object.values(review).filter(ele => ele.spotId == spotId)
  const numReivews = numReivewsArray.length

  const userId = user?.id
  const checkOwner = spot?.ownerId == userId
  const userReview = Object.values(review).filter(ele => ele.userId == +userId)
  const checkUserfirstReview = userReview?.length === 1

  useEffect(() => {
    document.title = spot.name
  }, [spot.name])

  useEffect(() => {
    dispatch(getOneSpot(spotId))
      .then(() => setIsloaded(true))
  }, [dispatch, spotId, review, numReivews]);

  let ownerFirstname;
  if (spot.Owner) {
    ownerFirstname = spot.Owner.firstName
  }

  let ownerLastname;
  if (spot.Owner) {
    ownerLastname = spot.Owner.lastName
  }
  // console.log('ownername', ownerName)
  let cleanFee = 100;
  // let typeClean=typeof(cleanFee)
  // console.log("typeClean", typeClean)
  // useEffect(() => {
  //   dispatch(getSpotReviews(spotId))
  //   .then(()=>setIsloaded(true))
  // }, [dispatch, review]);

  return (


    isLoaded && <div key={spot.id} className="spotdetail__wrapper">
      <div className='spotdetail__head'>
        <div className='spotdetail__head1'>{spot.name}</div>
        <div className='spotdetail__head2'>
          <div className='spotRating'>
            <i className="fa-solid fa-star"></i>
            <span> </span>
            {spot.avgStarRating ? spot.avgStarRating.toFixed(2) : '0.00'} </div>
          <span className='sd__footerspace'> · </span>
          <div className="sd__footerline2">{numReivews} reviews </div>
          <span className='sd__footerspace'> · </span>
          <div className="sd__footerline2"> {spot.city}, </div>
          <div className="sd__footerline2">{spot.state}, </div>
          <div className="sd__footerline2">{spot.country}</div>
        </div>
      </div>
      <div className='sd__image__container'>
        <div className='sd__image__left'>
          <img
            className="spot-image1"
            alt='spot pic'
            src={spot.previewImage}
            onError={e => { e.currentTarget.src = "https://filestore.community.support.microsoft.com/api/images/ext?url=https%3A%2F%2Fanswersstaticfilecdnv2.azureedge.net%2Fstatic%2Fimages%2Fimage-not-found.jpg"; }}
          />
        </div>
        <div className='sd__image__right'>
          <img
            className="spot-image2"
            alt='spot pic'
            src={spot.imageUrl1}
            onError={e => { e.currentTarget.src = "https://filestore.community.support.microsoft.com/api/images/ext?url=https%3A%2F%2Fanswersstaticfilecdnv2.azureedge.net%2Fstatic%2Fimages%2Fimage-not-found.jpg"; }}
          />
          <img
            className="spot-image3"
            alt='spot pic'
            src={spot.imageUrl2}
            onError={e => { e.currentTarget.src = "https://filestore.community.support.microsoft.com/api/images/ext?url=https%3A%2F%2Fanswersstaticfilecdnv2.azureedge.net%2Fstatic%2Fimages%2Fimage-not-found.jpg"; }}
          />
          <img
            className="spot-image4"
            alt='spot pic'
            src={spot.imageUrl3}
            onError={e => { e.currentTarget.src = "https://filestore.community.support.microsoft.com/api/images/ext?url=https%3A%2F%2Fanswersstaticfilecdnv2.azureedge.net%2Fstatic%2Fimages%2Fimage-not-found.jpg"; }}
          />
          <img
            className="spot-image5"
            alt='spot pic'
            src={spot.imageUrl4}
            onError={e => { e.currentTarget.src = "https://filestore.community.support.microsoft.com/api/images/ext?url=https%3A%2F%2Fanswersstaticfilecdnv2.azureedge.net%2Fstatic%2Fimages%2Fimage-not-found.jpg"; }}
          />
        </div>
      </div>

      <div id='spotdetail__body'>
        <div id='spotdetail__leftbody'>
          <div className='sd-container1'>

            <p id='hosted' className='sd-container1-text'>{spot.name} hosted by {ownerFirstname ? ownerFirstname : "John"} {ownerLastname ? ownerLastname : "Cena"}.</p>

            <div>
              <img
                className='sd-container1-pic'
                src='https://bklyner.com/content/images/avatar/93f233539890aaad33a641b86b34161e.jpeg'
                alt='profile'
                onError={e => { e.currentTarget.src = "https://bklyner.com/content/images/avatar/93f233539890aaad33a641b86b34161e.jpeg"; }}
              ></img>
            </div>
          </div>

          <div className='sd-container2'>
            <div className="sd-container2-1">
              <div>
                <i className="fa-solid fa-door-open fa-xl"></i>
              </div>
              <div className="sd-container2text">Self Check In</div>
            </div>
            <div className="sd-container2-1">
              <div>
                <i class="fa-solid fa-location-dot fa-xl"></i>
              </div>
              <div className="sd-container2text">Great location
              </div>
            </div>
            <div className="sd-container2-13">
              <div>
                <i className="fa-solid fa-calendar fa-xl"></i>
              </div>
              <div className="sd-container2text">Free cancellation for 48 hours
              </div>
            </div>
          </div>
          <div className='sd-container3'>

            <p id="spotdes">{spot.description}</p>
          </div>
          <div className='sd-container4'>
            <div className='sd-container4text'>What this place offers</div>
            <div className="sd-container4_icon">
              <div className="sd-container4-feature">
                <div>
                  <i className="fa-solid fa-utensils fa-xl"></i>
                </div>
                <div className="sd-container4-featuretext">Kitchen</div>
              </div>
              <div className="sd-container4-feature">
                <div>
                  <i className="fa-solid fa-car fa-xl"></i>
                </div>
                <div className="sd-container4-featuretext">Parking</div>
              </div>
              <div className="sd-container4-feature">
                <div>
                  <i className="fa-solid fa-paw fa-xl"></i>
                </div>
                <div className="sd-container4-featuretext">Pets allowed</div>
              </div>
              <div className="sd-container4-feature">
                <div>
                  <i className="fa-solid fa-wifi fa-xl"></i>
                </div>
                <div className="sd-container4-featuretext">Wifi</div>
              </div>
              <div className="sd-container4-feature">
                <div>
                  <i className="fa-regular fa-snowflake fa-xl"></i>
                </div>
                <div className="sd-container4-featuretext">Air Conditioning</div>
              </div>
              <div className="sd-container4-feature">
                <div>
                  <i className="fa-solid fa-tv fa-xl"></i>
                </div>
                <div className="sd-container4-featuretext">TV</div>
              </div>
              <div className="sd-container4-feature">
                <div>
                  <i className="fa-solid fa-charging-station fa-xl"></i>
                </div>
                <div className="sd-container4-featuretext">EV charger</div>
              </div>
              <div className="sd-container4-feature">
                <div>
                  <i className="fa-solid fa-video fa-xl"></i>
                </div>
                <div className="sd-container4-featuretext">Security Camera</div>

              </div>
              <div className="sd-container4-feature">
                <div>
                <i class="fa-solid fa-fan fa-xl"></i>
                </div>
                <div className="sd-container4-featuretext">Backyard</div>

              </div>

            </div>
          </div>
        </div>
        <div id='spotdetail__rightbody'>
          <div id='sd-bookingbox'>
            {/* <div id='sd-boxhead'>
              <div id='sd-boxheadleft'>
                <span id='sd-bookingprice'>${spot.price}</span>
                <span id='sd-bookingnight'>night</span>
              </div>
              <div id='sd-boxheadrught'>
                <i className="fa-solid fa-star"></i>
                <span id='sd-boxrating'>
                  {spot.avgStarRating ? spot.avgStarRating.toFixed(2) : '0.00'} </span>
                <span > · </span>
                <span id='sd-boxreviews'>{numReivews} reviews </span>
              </div>
            </div> */}
            <BookingCreateFormPage />
            {/* <section id='sd-boxtail'>
                <div className='fee-container'>
                  <div className='fee-containertext'>${spot.price}x5 nights</div>
                  <span className='fee-containertext'>${spot.price? spot.price*5 :null}</span>
                </div >
                <div className='fee-container'>
                  <div className='fee-containertext'>Cleaning fee</div>
                  <span className='fee-containertext'>${spot.price? Number.parseFloat(spot.price*0.1).toFixed(0) :null}</span>
                </div>
                <div className='fee-container'>
                  <div className='fee-containertext'>Service fee</div>
                  <span className='fee-containertext'>${spot.price?  Number.parseFloat(spot.price*0.15).toFixed(0) :null}</span>
                </div>
                <div className='fee-containertotal'>
                  <div className='fee-containertotaltext'>Total before taxes</div>
                  <span className='fee-containertotaltext'>${spot.price? Number.parseFloat(spot.price*5+spot.price*0.1+spot.price*0.15).toFixed(0) :null}</span>
                </div>
              </section> */}
          </div>
          {/* <div class="gmap_canvas">
                        <iframe width="600" height="500" id="gmap_canvas"
                            src="https://maps.google.com/maps?q=2880%20Broadway,%20New%20York&t=&z=13&ie=UTF8&iwloc=&output=embed"
                            frameborder="0" scrolling="no" marginheight="0" marginwidth="0">
                        </iframe><a href=" ">pirate bay</a >

                        <a href="https://www.embedgooglemap.net">custom google maps embed</a >

                    </div> */}
        </div>
      </div>

      <div className='sd__review__container'>
        <h1 id="sd__ratinghead" >
          <div id='spotreviewRating'>
            <i className="fa-solid fa-star fa-1x" style={{ left: "5px" }}></i>
            <span> </span>
            {spot.avgStarRating ? spot.avgStarRating.toFixed(2) : '0.00'} · {numReivews} reviews</div>
          {/* <span className='sd__footerspace'> · </span>
                  <div >{numReivews} reviews</div> */}
        </h1>


        <SpotReviews />
        {/* {user &&<ReviewCreateFormPage/>} */}
        {user && !checkOwner && !checkUserfirstReview && <NavLink to={`/spots/${spotId}/newreview`}>Write a public review</NavLink>}
      </div>
      <div className='sd__map__container'>
        <div className='sd__map_text'>Where you'll be</div>
        <MapContainersd lat={spot?.lat} lng={spot?.lng}/>
        <div className='sd__map_text_btm1'>
                  {spot?.city}, {spot?.state}, {spot?.country}
        </div>
        <div className='sd__map_text_btm2'>
        The beauty of the canyon is incredible, and when the sun sets, the colors become surreal. There are so many beautiful hikes or you can go surf at the best surf spots. After that you can indulge into the best smoothy and organic pastries at Living Cafe, or go eat a pizza ou will never forget at Endless Colors.
        </div>


      </div>

    </div>

  );
};

export default SpotDetail;
