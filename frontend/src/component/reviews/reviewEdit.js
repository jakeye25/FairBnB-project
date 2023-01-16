
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams} from 'react-router-dom'
import { createReview, editReview } from "../../store/review";
// import { getOneSpot } from "../../store/spot";
import './reviewCreate.css';
// import {Rating} from 'react-simple-star-rating';
import ReactStars from "react-rating-stars-component"

function ReviewEditFormPage({review, setShowModal}) {
    const history = useHistory()
    const dispatch = useDispatch();

    const [editrating, setEditRating] = useState(review?.stars);
    const [editedReview, setEditedReview] = useState(review?.review);
    const [validations, setValidations] = useState(false);


    const user = useSelector(state =>state.session.user)

    const starsClick = (rate) => {
        setEditRating(rate);
      };

      useEffect(() => {
        const errors = [];
        if (editrating <= 0 || editrating > 5)
          errors.push("Stars must be greater than 0 and less than 5");
        if (editedReview.length < 20)
          errors.push("Please add a review more than 20 characters long");
          setValidations(errors);
        }, [editrating, editedReview]);

    const handleSubmit = (e) => {
        e.preventDefault()
        // setSubmit(!submit);

        const payload = {
            id:review?.id,
            stars: editrating,
            review: editedReview
        }

        let editaReview = dispatch(editReview(payload))


            if (editaReview) setShowModal(false)
        }

        const handleCancelClick = (e) => {
            e.preventDefault();
            // setErrorMessages({});
            // setErrors([]);
            setShowModal(false)
        }


    return (


            <div className="edit_review_div">
                {/* {!checkOwner && !checkUserfirstReview && <button onClick={toggleReview } className="createreviewBtn">
                    Write a public review
                </button>} */}
            {/* {showReviewCreate && !checkUserfirstReview && */}
                <div className="create_review_header">My review</div>
                <form className="reviewCreateform"
                    onSubmit={handleSubmit}>

                    <div style={{ display: "flex" }}>
                        <ReactStars
                            onChange={starsClick}
                            isHalf={false}
                            count={5}
                            value={editrating}
                            size={30}
                            activeColor={'gold'}
                            emptyStarColor={'lightgrey'}
                        />
                    </div>
                    <textarea
                        type="text-area"
                        name="review"
                        value={editedReview}
                        className="edit_reviewcontent"
                        onChange={(event) => setEditedReview(event.target.value)}
                    ></textarea>
                    <div className="create_review_reviewby_text">
                        <div>Reviewed by {user?.firstName}</div>
                    </div>
                    {validations.length > 0 ? (
                        <div className="create_review_empty">
                        <div className="create_review_error">
                            {validations.map((error, i) => (
                            <div key={i} className='create_review_errortext'>{error}</div>
                            ))}
                        </div>
                        </div>
                    ) : (
                        <div className="create_review_empty"></div>
                    )}
                    <button id="reviewcreateBtn" disabled={validations.length > 0 } type='submit'>Edit</button>
                    <button type="button"  id="reviewcancelBtn" onClick={handleCancelClick}>Cancel</button>
            </form>
            </div>

    );
};


export default ReviewEditFormPage;
