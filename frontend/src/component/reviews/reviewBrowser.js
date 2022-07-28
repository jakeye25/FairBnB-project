import React from 'react';
import { NavLink, Route, useParams } from 'react-router-dom';
import {useEffect, useState} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getReviews } from '../../store/review';

const ReviewsBrowser = () => {
    const reviewsObj = useSelector((state) => state.review)

    const allreviews = Object.values(reviewsObj)

    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getReviews());
    },[dispatch])

    if(!allreviews.length) {
      return null
    }

    return (
        <>

           {allreviews.map((review) => (
            <span>
              <NavLink key={review.id} to={`/reviews/${review.id}`}>
                <div>userId: {review.userId}</div>
                <div className="centered">spotId: {review.spotId}</div>
                <div className="centered">Review: {review.review}</div>
                <div className="centered">Stars Rating: {review.stars}</div>
              </NavLink>
            </span>
                ))}
      </>
      );
}

export default ReviewsBrowser;
