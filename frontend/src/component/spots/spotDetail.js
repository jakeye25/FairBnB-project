import React from 'react';
import { useEffect, useState } from "react";
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOneSpot } from '../../store/spot';
import SpotReviews from '../reviews/spotReviews';
// import ReviewCreateFormPage from '../reviews/reviewCreate';


const SpotDetail = () => {
  const dispatch = useDispatch();
  const {spotId} = useParams();
  const [isLoaded, setIsloaded] = useState(false)
  const spot = useSelector((state) => state.spot[spotId])
  // console.log('kkk', spot)
  useEffect(() => {
    dispatch(getOneSpot(spotId))
    .then(()=>setIsloaded(true))
  }, [dispatch, spotId]);

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
        <div className="centered">{spot.description}</div>
        <div className="centered">${spot.price}</div>
        <ul>
        </ul>
        <div>
          <SpotReviews />
          {/* <ReviewCreateFormPage/> */}
        </div>
      </div>

  );
};

export default SpotDetail;
