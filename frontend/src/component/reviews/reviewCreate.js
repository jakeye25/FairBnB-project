
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useHistory, useParams} from 'react-router-dom'
import { createReview } from "../../store/review";


function ReviewCreateFormPage({reviewId, onClose}) {
    const dispatch = useDispatch();
    const reviews = useSelector((state) => state.review);
    // console.log('state',reviews)
    const review = reviews[reviewId]
    const [reviewContent, setReviewContent] = useState(review? review.review : "")
    const [stars, setStars] = useState(review? review.stars: "")
    const [errors, setErrors] = useState([]);

    const {spotId} = useParams()
    const spots = useSelector(state => state.spots)
    const user = useSelector(state =>state.session.user)

    const userId = user.id

    const handleSubmit = (e) => {
        e.preventDefault()
        const createPayload = {
            userId,
            spotId: spotId,
            stars,
            review: reviewContent
        }

        dispatch(createReview(createPayload))
            .then(()=> onClose())
            .catch(async(res)=> {
                const data = await res.json()
                if (data && data.errors) setErrors(data.errors)
            })
        }

    return (

        <section>

            <form
                onSubmit={handleSubmit}>
                    <ul>
                        {errors.map((error,index) => (
                            <li key={index}>{error}</li>
                        ))}
                    </ul>
                    <label>
                        Review
                        <input
                            value={reviewContent}
                            onChange={(e)=>setReviewContent(e.target.value)}
                            placeholder='review'
                            type='text'
                            />
                    </label>
                    <label>
                        starts
                        <input value={stars}
                        onChange={(e)=>setStars(e.target.value)}
                        type='number'
                        placeholder='place a rating'
                        />
                    </label>
                    <button type='submit'>Create</button>
            </form>
        </section>
    );
};


export default ReviewCreateFormPage;

//const history = useHistory();
    // const dispatch = useDispatch();
    // // const [isLoaded, setIsloaded] = useState(false)
    // const {spotId} = useParams()
    // const sessionUserId = useSelector(state =>state.session.user)
    // // console.log('id', sessionUserId)
    // const spots = useSelector(state => state.spots)
    // // console.log('spotid',spotId)
    // const reviews = useSelector((state) => state.review)
    // console.log('rev', reviews)
    // const [review, setReview] = useState('');
    // const [stars, setStars] = useState('');

    // const [errorMessages, setErrorMessages] = useState({});

    // // if (!sessionUser) alert("You must login to leave review!")
    // let userId = sessionUserId
    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    // let newReview = { userId, spotId, review, stars }
    // let createdReview;
    // try{
    //     createdReview = await dispatch(createReview(newReview))

    // } catch (error) {
    //     setErrorMessages({ overall: error.toString().slice(7) })
    // }
    // if (createReview) {
    //     setErrorMessages({});

    //   }
    // }
    // const handleCancelClick = (e) => {
    //     e.preventDefault();
    //     setErrorMessages({});
    // }
