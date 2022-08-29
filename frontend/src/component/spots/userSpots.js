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
          <div className ='wrapper'>
        {spots.map((spot) => (
      <div key={spot.id} className='card__container'>
              <div className='image__container'>
                <img
                  className="card__image"
                  alt=''
                  src={spot.previewImage}
                />
              </div>
        <div className="userspot__bottomcontainer" >

                    <div className="userspot__container1">{spot.name}</div>
                    <div className="userspot__container1">{spot.description}</div>
                    <div className="userspot__container1">${spot.price} night</div>

              <div className="userspot__container2">
                    <div className="userspotbtn">
                      <Link to={`/spots/${spot.id}/edit`}>
                      <i className="fa-solid fa-pen-to-square"></i>
                      </Link>
                    </div>
                    <span> &nbsp;</span>
                      <div className="userspotbtn" onClick={() => dispatch(spotActions.deleteSpot(spot.id))}>
                      <i className="fa-solid fa-trash-can"></i>
                      </div>

              </div>
          </div>
      </div>

        ))}
        </div>
        </>
    );
  };

  export default UserSpots;
