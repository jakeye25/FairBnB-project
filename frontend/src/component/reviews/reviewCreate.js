
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams} from 'react-router-dom'
import { createReview } from "../../store/review";
import { getOneSpot } from "../../store/spot";
import './reviewCreate.css';


function ReviewCreateFormPage({reviewId, onClose}) {
    const dispatch = useDispatch();
    const reviews = useSelector((state) => state.review);
    // console.log('reviewstate',reviews)
    const review = reviews[reviewId]
    const [reviewContent, setReviewContent] = useState(review? review.review : "")
    const [stars, setStars] = useState(review? review.stars: "")
    const [errors, setErrors] = useState([]);
    const [showReviewCreate, setshowReviewCreate] = useState(false);

    const {spotId} = useParams()
    const userspot = useSelector(state => state.spot[spotId])
    const user = useSelector(state =>state.session.user)
    console.log('checkuserspot', userspot)
    const userId = user.id
    const checkOwner = userspot.ownerId == userId
    console.log('checkowner', checkOwner)
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
                    <ul>
                        {errors.map((error,index) => (
                            <li key={index}>{error}</li>
                        ))}
                    </ul>

                        <input
                            value={reviewContent}
                            onChange={(e)=>setReviewContent(e.target.value)}
                            placeholder='Leave your review'
                            type='text'
                            />

                    <span>  </span>

                        <input value={stars}

                        onChange={(e)=>setStars(e.target.value)}
                        type='number'
                        placeholder='Place a rating'
                        />
                    <span> </span>
                    <button type='submit'>Create</button>
            </form>}
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
