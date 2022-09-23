import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
// import sessionReducer from "../../store/session";
import * as spotActions from "../../store/spot"
import SpotEditFormPage from "./spotEdit";
import { useParams } from "react-router-dom";
import { Modal } from '../../context/Modal'
import { Link } from "react-router-dom";
import './spotList.css';

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
          <div id ='userspot-container'>
        {spots.map((spot) => (
      <div key={spot.id} id='userspot__ind-container'>
              <div id='userspotimg__container'>
                <img
                  id="userspotimg"
                  alt=''
                  src={spot.previewImage}
                />
              </div>
        <div id="userspot__rightcontainer" >
                    <div className="userspot__container1">{spot.city}</div>
                    <div className="userspot__container1">{spot.name}</div>
                    <div className="userspot__container1">{spot.description}</div>
                    <div className="userspot__container1">${spot.price} night</div>


                    <div className="userspotbtn">
                      <Link to={`/spots/${spot.id}/edit`}>
                      Edit
                      </Link>
                    </div>
                    <span> &nbsp;</span>
                      <div className="userspotbtn" onClick={() => dispatch(spotActions.deleteSpot(spot.id))}>
                      Delete
                      </div>

              
          </div>
      </div>

        ))}
        </div>
        </>
    );
  };

  export default UserSpots;
