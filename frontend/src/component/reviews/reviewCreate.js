
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams} from 'react-router-dom'
import { createReview } from "../../store/review";
// import { getOneSpot } from "../../store/spot";
import './reviewCreate.css';
// import {Rating} from 'react-simple-star-rating';
import ReactStars from "react-rating-stars-component"

function ReviewCreateFormPage({reviewId, onClose}) {
    const history = useHistory()
    const dispatch = useDispatch();
    const reviews = useSelector((state) => state.review);
    // console.log('reviewstate',reviews)
    const review = reviews[reviewId]
    // const [reviewContent, setReviewContent] = useState(review? review.review : "")
    // const [stars, setStars] = useState(review? review.stars : "")
    // const [errors, setErrors] = useState([]);
    // const [showReviewCreate, setshowReviewCreate] = useState(false);

    const [rating, setRating] = useState(0);
    const [createdReview, setCreatedReview] = useState('');
    // const [createdReviewImg, setcreatedReviewImg] = useState(review.reviewImg)
    // const [submit, setSubmit] = useState(false);
    const [validations, setValidations] = useState(false);

    const {spotId} = useParams()
    const userspot = useSelector(state => state.spot[spotId])
    const user = useSelector(state =>state.session.user)

    const userId = user.id
    const checkOwner = userspot.ownerId == userId
    // console.log('checkowner', checkOwner)
    // console.log('check review state', reviews)
    const userReview = Object.values(reviews).filter(ele => ele.userId == +userId)
    // console.log('check user review state', userReview)

    const checkUserfirstReview = userReview.length === 1
    // console.log('check', checkUserfirstReview)
    // if(reviews){let userReivew = Object.values(reviews).find(ele=> ele.userId = userId)}
    // const toggleReview =() => {
    //     setshowReviewCreate(!showReviewCreate)
    // }
    const starsClick = (rate) => {
        setRating(rate);
      };

      useEffect(() => {
        const errors = [];
        if (rating <= 0 || rating > 5)
          errors.push("Stars must be greater than 0 and less than 5");
        if (createdReview.length < 20)
          errors.push("Please add a review more than 20 characters long");
          setValidations(errors);
        }, [rating, createdReview]);

    const handleSubmit = (e) => {
        e.preventDefault()
        // setSubmit(!submit);

        const createPayload = {
            userId,
            spotId: spotId,
            stars: rating,
            review: createdReview
        }

        let newReview = dispatch(createReview(createPayload))
            // .then(toggleReview)
            // .catch(async(res)=> {
            //     const data = await res.json()
            //     if (data && data.errors) setErrors(data.errors)
            // })

            if (newReview) {history.push(`/spots/${createPayload?.spotId}`)}
        }

        const handleCancelClick = (e) => {
            e.preventDefault();
            // setErrorMessages({});
            // setErrors([]);
            history.push(`/spots/${spotId}`);
        }

    return (


            <div className="create_review_div">
                {/* {!checkOwner && !checkUserfirstReview && <button onClick={toggleReview } className="createreviewBtn">
                    Write a public review
                </button>} */}
            {/* {showReviewCreate && !checkUserfirstReview && */}
                <div className="create_review_header">My review</div>
                <form className="reviewCreateform"
                    onSubmit={handleSubmit}>
                    {/* <ul id="reviewcreateerror">
                        {errors.map((error,index) => (
                            <li key={index}>{error}</li>
                        ))}
                    </ul>

                        <textarea
                            value={reviewContent}
                            id='createreviewtext'
                            onChange={(e)=>setReviewContent(e.target.value)}
                            placeholder='Leave your review'
                            type='text'
                            />

                    <span>  </span>

                        <input value={stars}
                        id='createreviewrating'
                        onChange={(e)=>setStars(e.target.value)}
                        type='number'
                        placeholder='Place a rating range withn 1-5'
                        />
                    <span> </span> */}
                    <div style={{ display: "flex" }}>
                        <ReactStars
                            onChange={starsClick}
                            isHalf={false}
                            count={5}
                            value={rating}
                            size={30}
                            activeColor={'gold'}
                            emptyStarColor={'lightgrey'}
                        />
                    </div>
                    <textarea
                        type="text-area"
                        name="review"
                        value={createdReview}
                        className="create_reviewcontent"
                        onChange={(event) => setCreatedReview(event.target.value)}
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
                    <button id="reviewcreateBtn" disabled={validations.length > 0 } type='submit'>Create</button>
                    <button type="button"  id="reviewcancelBtn" onClick={handleCancelClick}>Cancel</button>
            </form>
            </div>

    );
};


export default ReviewCreateFormPage;
