import React from 'react';
import { useEffect, useState } from "react";
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOneSpot } from '../../store/spot';
import SpotReviews from '../reviews/spotReviews';
import ReviewCreateModal from '../reviews/reviewCreateModal';
import { getSpotReviews } from '../../store/review';


const SpotDetail = () => {
  const dispatch = useDispatch();
  const {spotId} = useParams();
  const [isLoaded, setIsloaded] = useState(false)
  const user = useSelector((state) => state.session.user)
  const spot = useSelector((state) => state.spot[spotId])
  // console.log('kkk', spot.avgStarRating)
  const review = useSelector((state) => state.review)
  // console.log('spot: ', spot)
  // console.log('spotReview', review)

  useEffect(() => {
    dispatch(getOneSpot(spotId ))
    .then(()=>setIsloaded(true))
  }, [dispatch, spotId, review]);

  useEffect(() => {
    dispatch(getSpotReviews(spotId))
    .then(()=>setIsloaded(true))
  }, [dispatch, review]);

  return (

      isLoaded&&<div key={spot.id}>
        <div>
          <img
            className="spot-image"
            alt={spot.previewImage}
            src={spot.previewImage}
          />
        </div>
        <div>{spot.name}</div>
        <div className="centered">{spot.address}</div>
        <div className="centered">{spot.city}</div>
        <div className="centered">{spot.state}</div>
        <div className="centered">{spot.country}</div>
        <div className="centered">{spot.description}</div>
        <div className='spotRating'>
          <i className="fa-solid fa-star"></i>
          {spot.avgStarRating? spot.avgStarRating.toFixed(2) : 0.00}</div>
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
