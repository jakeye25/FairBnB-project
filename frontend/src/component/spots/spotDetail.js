import React from 'react';
import { useEffect } from "react";
import { Link } from 'react-router-dom';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOneSpot } from '../../store/spot';

const SpotDetail = () => {
  const dispatch = useDispatch();
  const {spotId} = useParams();
  const spot = useSelector((state) => state.spot)
  // console.log('kkk', spotsObj)
  useEffect(() => {
    dispatch(getOneSpot(spotId));
  }, [dispatch, spotId]);

  return (
    <>
      <div key={spot.id}>
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
        
        </div>
    </>
  );
};

export default SpotDetail;
