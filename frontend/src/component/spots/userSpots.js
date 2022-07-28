import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
// import sessionReducer from "../../store/session";
import * as spotActions from "../../store/spot"
import SpotEditFormPage from "./spotEdit";



const UserSpots = () => {
    const spotsObj = useSelector((state) => state.spot)

    const spots = Object.values(spotsObj)

    // const user = useSelector((state) => state.session.user)

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
        <div className="centered">${spot.price}</div>

          <div className="centered">
          {/* <button onClick={() => dispatch(spotActions.updateSpot(spot))}>
              Edit
            </button> */}
            <SpotEditFormPage />
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
