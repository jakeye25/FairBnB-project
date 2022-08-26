import React from 'react';
import { NavLink, Route, useParams } from 'react-router-dom';
import {useEffect, useState} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getReviews } from '../../store/review';
import './reviewBrowser.css';


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
            <div className='reviewlist__container'>
              <NavLink key={review.id} to={`/reviews/${review.id}`}>
                <div>userId: {review.userId}</div>
                <div className="reviewlist__content">spotId: {review.spotId}</div>
                <div className="reviewlist__content">Review: {review.review}</div>
                <div className="reviewlist__content">Stars Rating: {review.stars}</div>
              </NavLink>
            </div>
                ))}
      </>
      );
}

export default ReviewsBrowser;
