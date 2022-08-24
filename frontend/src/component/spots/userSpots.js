import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
// import sessionReducer from "../../store/session";
import * as spotActions from "../../store/spot"
import SpotEditFormPage from "./spotEdit";
import { useParams } from "react-router-dom";
import { Modal } from '../../context/Modal'
import { Link } from "react-router-dom";

const UserSpots = () => {
    const spotsObj = useSelector((state) => state.spot)

    const spots = Object.values(spotsObj)

    // const { spotId} = useParams()
    // const user = useSelector((state) => state.session.user)
    // console.log('spots', spots)
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(spotActions.getOwnerSpots());
    }, [dispatch]);

    if (!spots.length) {
      return null;
    }

    return (
        <>

        {spots.map((spot) => (
      <div key={spot.id}>
        <div>
          <img
            className="spot-image"
            alt={spot.previewImage}
            src={spot.previewImage}
          />
        </div>
        <div>{spot.name}</div>
        <div className="centered">{spot.description}</div>
        <div className="centered">${spot.price} night</div>
        <div className="centered">
          <Link to={`/spots/${spot.id}/edit`}>Edit</Link>
          <button onClick={() => dispatch(spotActions.deleteSpot(spot.id))}>
              Delete
          </button>
        </div>
      </div>

        ))}
        </>
    );
  };

  export default UserSpots;
