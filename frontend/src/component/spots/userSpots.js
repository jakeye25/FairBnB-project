import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
// import sessionReducer from "../../store/session";
import * as spotActions from "../../store/spot"


const UserSpots = () => {
    const spotsObj = useSelector((state) => state.spot)
    // console.log('obj',spotsObj)
    const spots = Object.values(spotsObj)
    // console.log('spots', spots)
    const user = useSelector((state) => state.session.user)
    //   if (!spot,ownerId) return null;
    //   return user.spots.map(spotId => state.spots[ownerId]);
    // }
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
          {/* <div className="centered">
            <button onClick={() => setEditSpotId(spot.id)}>
              Edit
            </button>
          </div> */}
          <div className="centered">
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
