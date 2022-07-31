
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useHistory, useParams} from 'react-router-dom'
import * as sessionActions from "../../store/session";
import { createReview } from "../../store/review";
import ErrorMessage from '../spots/ErrorMessage';

function ReviewCreateFormPage() {

    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(state =>state.session.user)
    let userId = user.id
    const {spotId} = useParams()
    console.log('spotid',spotId)
    const reviews = useSelector((state) => state.review)
    console.log('rev', reviews)
    const [review, setReview] = useState();
    const [stars, setStars] = useState();

    const [errorMessages, setErrorMessages] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();

    let newReview = { userId, spotId, review, stars }
    let createdReview;
    try{
        createdReview = await dispatch(createReview(newReview))
    } catch (error) {
        setErrorMessages({ overall: error.toString().slice(7) })
    }
    if (createReview) {
        setErrorMessages({});
        history.push(`/reviews/me`);
      }
    }
    const handleCancelClick = (e) => {
        e.preventDefault();
        setErrorMessages({});
    }

    return (
        <section className="new-form-holder centered middled">

      <ErrorMessage message={errorMessages.overall} />
        <form className="create-review-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Review Comment"
          required
          value={review}
          onChange={(e) => setReview(e.target.value)} />
        <ErrorMessage label={"Review Comment"} message={errorMessages.review} />
        <input
          type="number"
          placeholder="Stars"
          min="1"
          max="5"
          required
          value={stars}
          onChange={(e) => setStars(e.target.value)} />
        <ErrorMessage label={"Stars"} message={errorMessages.stars} />
            <button type="submit">Create New Review</button>
            <button type="button" onClick={handleCancelClick}>Cancel</button>
        </form>
    </section>
    );
};


export default ReviewCreateFormPage;
