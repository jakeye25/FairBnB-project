import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import { getUserReviews, deleteReview } from "../../store/review";
import { NavLink } from "react-router-dom";
import './reviewBrowser.css'


const UserReviews = () => {
    const reviewsObj = useSelector((state) => state.review)

    const reviews = Object.values(reviewsObj)
    // console.log('reviews', reviews)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserReviews());
      }, [dispatch]);

      if (!reviews.length) {
        return (
          <div className="reviewlist__container">
            <h1 className="reviewlist__noreview">You haven't left us a review on FairBnB yet!</h1>
          </div>
        );
      }

      return (
        <>

            {reviews.map((review) => (
            <div className="reviewlist__container">
              <div  key={review.id}
              // to={`/reviews/${review.id}`}
              >

                <div className="centered">spotId: {review.spotId}</div>
                <div className="centered">Review: {review.review}</div>
                <div className="centered">Stars Rating: {review.stars}</div>
              </div>

                <button className="reviewlist__delbtn" onClick={() => dispatch(deleteReview(review.id))}>
                    Delete
                 </button>
            </div>
        ))}
        </>
    );


}

export default UserReviews;
