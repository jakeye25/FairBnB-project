
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams} from 'react-router-dom'
import { createReview } from "../../store/review";
import { getOneSpot } from "../../store/spot";
import './reviewCreate.css';


function ReviewCreateFormPage({reviewId, onClose}) {
    const dispatch = useDispatch();
    const reviews = useSelector((state) => state.review);
    // console.log('state',reviews)
    const review = reviews[reviewId]
    const [reviewContent, setReviewContent] = useState(review? review.review : "")
    const [stars, setStars] = useState(review? review.stars: "")
    const [errors, setErrors] = useState([]);
    const [showReviewCreate, setshowReviewCreate] = useState(false);

    const {spotId} = useParams()
    // const spots = useSelector(state => state.spots)
    const user = useSelector(state =>state.session.user)

    const userId = user.id

    const openMenu = () => {
        if (showReviewCreate) return;
        setshowReviewCreate(true);
      };

    useEffect(() => {
        if (!showReviewCreate) return;

        const closeMenu = () => {
            setshowReviewCreate(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
      }, [showReviewCreate]);

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
            .then(()=> onClose())
            .catch(async(res)=> {
                const data = await res.json()
                if (data && data.errors) setErrors(data.errors)
            })


        }

    return (

        <section>
                <div onClick={openMenu}>
                    <button className="createreviewBtn">Any great experiences? Click here and leave your thoughts here!!! </button>

                </div>
            {showReviewCreate && <form
                onSubmit={handleSubmit}>
                    <ul>
                        {errors.map((error,index) => (
                            <li key={index}>{error}</li>
                        ))}
                    </ul>

                        <input
                            value={reviewContent}
                            onChange={(e)=>setReviewContent(e.target.value)}
                            placeholder='leave your review'
                            type='text'
                            />

                    <br></br>

                        <input value={stars}

                        onChange={(e)=>setStars(e.target.value)}
                        type='number'
                        placeholder='place a rating'
                        />

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
