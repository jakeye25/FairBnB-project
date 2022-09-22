import React from 'react';
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOneSpot } from '../../store/spot';
import SpotReviews from '../reviews/spotReviews';
// import ReviewCreateModal from '../reviews/reviewCreateModal';
import ReviewCreateFormPage from '../reviews/reviewCreate'
// import { getSpotReviews } from '../../store/review';
import './spotDetail.css';

const SpotDetail = () => {
  const dispatch = useDispatch();
  const {spotId} = useParams();
  const [isLoaded, setIsloaded] = useState(false)
  const user = useSelector((state) => state.session.user)
  const spot = useSelector((state) => state.spot[spotId])
  // console.log('single spot', spot)

  // console.log('kkk', spot.avgStarRating)
  const review = useSelector((state) => state.review)
  // console.log('spot: ', spot)
  // console.log('checkuser', user)
  // console.log('checkreview', review)

  // if(user) { let userReview= Object.values(review).filter(ele => ele.userId == user.id)}
  // console.log('userReview', userReview? userReview : null)


  const numReivewsArray = Object.values(review).filter(ele => ele.spotId == spotId)
  // console.log('numreviews', numReivews.length)
  // console.log('spotReview', Object.values(review).length)
  const numReivews = numReivewsArray.length

  useEffect(() => {
    document.title = spot.name
  }, [spot.name])

  useEffect(() => {
    dispatch(getOneSpot(spotId ))
    .then(()=>setIsloaded(true))
  }, [dispatch, spotId, review, numReivews]);

 let ownerFirstname;
 if(spot.Owner) {
  ownerFirstname = spot.Owner.firstName
 }

 let ownerLastname;
 if(spot.Owner) {
  ownerLastname = spot.Owner.lastName
 }
  // console.log('ownername', ownerName)
let cleanFee= 100;
// let typeClean=typeof(cleanFee)
// console.log("typeClean", typeClean)
  // useEffect(() => {
  //   dispatch(getSpotReviews(spotId))
  //   .then(()=>setIsloaded(true))
  // }, [dispatch, review]);

  return (


      isLoaded&&<div key={spot.id} className="spotdetail__wrapper">
        <div className='spotdetail__head'>
            <div className='spotdetail__head1'>{spot.name}</div>
              <div className='spotdetail__head2'>
                <div className='spotRating'>
                  <i className="fa-solid fa-star"></i>
                  <span> </span>
                  {spot.avgStarRating? spot.avgStarRating.toFixed(2) : '0.00'} </div>
                <span className='sd__footerspace'> · </span>
                <div className="sd__footerline2">{numReivews} reviews </div>
                <span className='sd__footerspace'> · </span>
                <div className="sd__footerline2"> {spot.city}, </div>
                <div className="sd__footerline2">{spot.state}, </div>
                <div className="sd__footerline2">{spot.country}</div>
              </div>
              </div>
                  <div id='sd__image__container'>
                    <img
                      className="spot-image"
                      alt='spot pic'
                      src={spot.previewImage}
                    />
                  </div>

        <div id='spotdetail__body'>
          <div id='spotdetail__leftbody'>
            <p id='hosted'>{spot.name} hosted by {ownerFirstname? ownerFirstname:"John"} {ownerLastname? ownerLastname:"Cena"}.</p>

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
                      {spot.avgStarRating? spot.avgStarRating.toFixed(2) : '0.00'} </span>
                  <span > · </span>
                  <span id='sd-boxreviews'>{numReivews} reviews </span>
                </div>
              </div>
              <section id='sd-boxtail'>
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
              </section>
            </div>
          </div>
        </div>

          <div className='sd__review__container'>
            <h1 id="sd__ratinghead" >
              <div id='spotreviewRating'>
                    <i className="fa-solid fa-star fa-1x" style={{left:"5px"}}></i>
                    <span> </span>
                    {spot.avgStarRating? spot.avgStarRating.toFixed(2) : '0.00'} · {numReivews} reviews</div>
                    {/* <span className='sd__footerspace'> · </span>
                  <div >{numReivews} reviews</div> */}
            </h1>


            <SpotReviews />
            {user &&<ReviewCreateFormPage/>}
          </div>

      </div>

  );
};

export default SpotDetail;
