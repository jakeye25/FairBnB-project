import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import { getSpotReviews } from "../../store/review";
import { NavLink, useParams } from "react-router-dom";

const SpotReviews = () => {
    const reviewsObj = useSelector((state) => state.review)
    console.log('reviewobj', reviewsObj)
    const reviews = Object.values(reviewsObj)
    const{id} = useParams()
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSpotReviews(id));
      }, [dispatch]);

      if (!reviews.length) {
        return null;
      }

      return (
        // <h1>testing</h1>
        <>
            <h1>testing</h1>
            {reviews.map((review) => (
            <div key={review.id}>
              {/* <NavLink key={review.id} to={`/reviews/${review.id}`}> */}

                {/* <div className="centered">spotId: {review.spotId}</div> */}
                <div className="centered">Review: {review.review}</div>
                <div className="centered">Stars Rating: {review.stars}</div>
              {/* </NavLink> */}

                {/* <button onClick={() => dispatch(deleteReview(review.id))}>
                    Delete
                 </button> */}
            </div>
        ))}
        </>
    );
}

export default SpotReviews;
