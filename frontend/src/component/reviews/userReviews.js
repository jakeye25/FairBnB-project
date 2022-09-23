import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import { getUserReviews, deleteReview } from "../../store/review";
import { NavLink } from "react-router-dom";
import './reviewBrowser.css'


const UserReviews = () => {
    const reviewsObj = useSelector((state) => state.review)

    const reviews = Object.values(reviewsObj)
    // const spotObj = useSelector((state) => state.spot)
    // const spots= Object.values(spotObj)
    // let spotId = reviews.map((review)=> review.spotId)
    // console.log('userreviews', spotId)
    // console.log('userreviewspot',spots)
    // const singlespot= spots.find(ele => ele.id == +spotId)
    // console.log('siglespot', singlespot.name)
    const dispatch = useDispatch();


    // console.log('userreviewspotname', spotName)

    useEffect(() => {
        dispatch(getUserReviews());
      }, [dispatch]);



      if (!reviews.length) {
        return (
          <div id="userreview-container">
            <h1>Reviews</h1>
            <h2 className="reviewlist__noreview">You haven't left us a review on FairBnB yet!</h2>
          </div>
        );
      }

      return (
        <>
          <div id="userreview-container">
            <h1>Reviews</h1>
            {reviews.map((review) => (
            <div className="reviewlist__container">
              <div  key={review.id}
              // to={`/reviews/${review.id}`}
              >

                {/* <div>{singlespot.name}</div> */}
                <div className="centered">Review: {review.review}</div>
                <div className="centered">Stars Rating: {review.stars}</div>
              </div>

                <button className="reviewlist__delbtn" onClick={() => dispatch(deleteReview(review.id))}>
                    Delete
                 </button>
            </div>
            ))}
          </div>
        </>
    );


}

export default UserReviews;
