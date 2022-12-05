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
          <p id='hosted'>{spot.name} hosted by {ownerFirstname ? ownerFirstname : "John"} {ownerLastname ? ownerLastname : "Cena"}.</p>

          <p id="spotdes">{spot.description}</p>
        </div>
        <div id='spotdetail__rightbody'>
          <div id='sd-bookingbox'>
            <div id='sd-boxhead'>
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
            </div>
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

    </div>

  );
};

export default SpotDetail;
