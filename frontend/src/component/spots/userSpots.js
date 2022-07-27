import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
// import sessionReducer from "../../store/session";
import * as spotActions from "../../store/spot"


const UserSpots = () => {
    const spotsObj = useSelector((state) => state.spot)

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

    if (!spots) {
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
            src={`https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500`}
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
            <button onClick={() => dispatch(spotActions.deleteSpot(spot.id, user.id))}>
              Delete
            </button>
          </div>
      </div>

        ))}
        </>
    );
  };

  export default UserSpots;
