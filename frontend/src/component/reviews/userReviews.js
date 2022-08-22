import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import { getUserReviews, deleteReview } from "../../store/review";
import { NavLink } from "react-router-dom";

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
          <h1>No Reviews Left</h1>
        );
      }

      return (
        <>

            {reviews.map((review) => (
            <span>
              <NavLink key={review.id} to={`/reviews/${review.id}`}>

                <div className="centered">spotId: {review.spotId}</div>
                <div className="centered">Review: {review.review}</div>
                <div className="centered">Stars Rating: {review.stars}</div>
              </NavLink>

                <button onClick={() => dispatch(deleteReview(review.id))}>
                    Delete
                 </button>
            </span>
        ))}
        </>
    );


}

export default UserReviews;
