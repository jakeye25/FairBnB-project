
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams} from 'react-router-dom'
import { createReview } from "../../store/review";
// import { getOneSpot } from "../../store/spot";
import './reviewCreate.css';


function ReviewCreateFormPage({reviewId, onClose}) {
    const dispatch = useDispatch();
    const reviews = useSelector((state) => state.review);
    // console.log('reviewstate',reviews)
    const review = reviews[reviewId]
    const [reviewContent, setReviewContent] = useState(review? review.review : "")
    const [stars, setStars] = useState(review? review.stars : "")
    const [errors, setErrors] = useState([]);
    const [showReviewCreate, setshowReviewCreate] = useState(false);

    const {spotId} = useParams()
    const userspot = useSelector(state => state.spot[spotId])
    const user = useSelector(state =>state.session.user)
    // console.log('checkuserspot', userspot)
    const userId = user.id
    const checkOwner = userspot.ownerId == userId
    // console.log('checkowner', checkOwner)
    // console.log('check review state', reviews)
    const userReview = Object.values(reviews).filter(ele => ele.userId == +userId)
    // console.log('check user review state', userReview)

    const checkUserfirstReview = userReview.length === 1
    // console.log('check', checkUserfirstReview)
    // if(reviews){let userReivew = Object.values(reviews).find(ele=> ele.userId = userId)}
    const toggleReview =() => {
        setshowReviewCreate(!showReviewCreate)
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        setErrors([]);
        if (!reviewContent)
        return setErrors(['Please enter review comment'])
        if (stars>5 || stars<1)
        return setErrors(['Rating must be within range 1-5'])

        const createPayload = {
            userId,
            spotId: spotId,
            stars,
            review: reviewContent
        }

        dispatch(createReview(createPayload))
            .then(toggleReview)
            .catch(async(res)=> {
                const data = await res.json()
                if (data && data.errors) setErrors(data.errors)
            })


        }

    return (

        <section>
                {!checkOwner && !checkUserfirstReview && <button onClick={toggleReview } className="createreviewBtn">
                    Any great experiences? Click here and leave your thoughts !!!

                </button>}
            {showReviewCreate && !checkUserfirstReview && <form className="reviewCreateform"
                onSubmit={handleSubmit}>
                    <ul id="reviewcreateerror">
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
                        // min="1"
                        // max="5"
                        />
                    <span> </span>
                    <button id="reviewcreateBtn" type='submit'>Create</button>
            </form>}
        </section>
    );
};


export default ReviewCreateFormPage;
