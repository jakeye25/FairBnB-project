import React from 'react';
import { useEffect, useState } from "react";
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOneSpot } from '../../store/spot';
import SpotReviews from '../reviews/spotReviews';
import ReviewCreateModal from '../reviews/reviewCreateModal';
// import { getSpotReviews } from '../../store/review';
import './spotDetail.css';

const SpotDetail = () => {
  const dispatch = useDispatch();
  const {spotId} = useParams();
  const [isLoaded, setIsloaded] = useState(false)
  const user = useSelector((state) => state.session.user)
  const spot = useSelector((state) => state.spot[spotId])
  // console.log('kkk', spot.avgStarRating)
  const review = useSelector((state) => state.review)
  // console.log('spot: ', spot)
  const numReivewsArray = Object.values(review).filter(ele => ele.spotId == spotId)
  // console.log('numreviews', numReivews.length)
  // console.log('spotReview', Object.values(review).length)
  const numReivews = numReivewsArray.length
  useEffect(() => {
    dispatch(getOneSpot(spotId ))
    .then(()=>setIsloaded(true))
  }, [dispatch, spotId, review, numReivews]);

  // useEffect(() => {
  //   dispatch(getSpotReviews(spotId))
  //   .then(()=>setIsloaded(true))
  // }, [dispatch, review]);

  return (


      isLoaded&&<div key={spot.id} className="spotdetail__wrapper">
        <div className='spotdetail__head1'>{spot.name}</div>
        <div className='spotdetail__head2'>
          <div className='spotRating'>
            <i className="fa-solid fa-star"></i>
            {spot.avgStarRating? spot.avgStarRating.toFixed(2) : '0.00'} ~ </div>
          <div>{numReivews} reviews ~</div>
          <div className="centered"> {spot.city}, </div>
          <div className="centered">{spot.state}, </div>
          <div className="centered">{spot.country}</div>
        </div>
        <div>
          <img
            className="spot-image"
            alt='Image'
            src={spot.previewImage}
          />
        </div>
        <p className="centered">{spot.description}</p>

        <div className="centered">${spot.price} night</div>
        <ul>
        </ul>
        <div>
          <SpotReviews />
          {user &&<ReviewCreateModal/>}
        </div>
      </div>

  );
};

export default SpotDetail;
