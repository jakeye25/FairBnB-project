import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { getSpotReviews } from "../../store/review";
import { NavLink, useParams } from "react-router-dom";
import './reviewBrowser.css';


const SpotReviews = () => {

  const [isLoaded, setIsloaded] = useState(false)
    const reviewsObj = useSelector((state) => state.review)
    // console.log('reviewobj', reviewsObj)

    const reviews = Object.values(reviewsObj)
    const{spotId} = useParams()
    // console.log('spotid', spotId)
    const dispatch = useDispatch();
  // console.log('spotdetailreview', reviews)
    // const filteredReviews = reviews.filter(review => review?.spotId === +spotId)

    useEffect(() => {
        dispatch(getSpotReviews(spotId))
        .then(()=>setIsloaded(true));
      }, [dispatch, spotId]);

      return (

        isLoaded &&<>

          {reviews.length ? reviews.map((review) => (
            <div  className="reviewspot__container" key={review.id}>
              {/* <NavLink key={review.id} to={`/reviews/${review.id}`}> */}

                <div className="centered">Annoymous</div>
                <div>{review.createdAt.slice(0, 10)}</div>
                <div className="centered">{review.review}</div>
                <span></span>
                {/* <div className="centered">Stars Rating: {review.stars}</div> */}
                <div>
              </div>

            </div>


          ))
          : <h3>No current review</h3>}
    </>
    );
}

export default SpotReviews;
