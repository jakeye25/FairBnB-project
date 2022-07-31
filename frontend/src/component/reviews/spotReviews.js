import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { getSpotReviews } from "../../store/review";
import { NavLink, useParams } from "react-router-dom";

const SpotReviews = () => {
    const reviewsObj = useSelector((state) => state.review)
    // console.log('reviewobj', reviewsObj)
    const [isLoaded, setIsloaded] = useState(false)
    const reviews = Object.values(reviewsObj)
    const{spotId} = useParams()
    // console.log('spotid', spotId)
    const dispatch = useDispatch();

    const filteredReviews = reviews.filter(review => review?.spotId ===+spotId)

    useEffect(() => {
        dispatch(getSpotReviews(spotId))
        // .then(()=>setIsloaded(true));
      }, [dispatch, reviews.length]);

      if (!reviews.length) {
        return null;
      }

      return (

        <>

            {filteredReviews && filteredReviews.map((review) => (
            <div key={review.id}>
              {/* <NavLink key={review.id} to={`/reviews/${review.id}`}> */}

                <div className="centered">UserId: {review.userId}</div>
                <div className="centered">Review: {review.review}</div>
                <div className="centered">Stars Rating: {review.stars}</div>
                <ul></ul>
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
