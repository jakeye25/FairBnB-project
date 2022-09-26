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
      return (
        <div id ='userspot-container'>
          <h1 id="userspot-listing"> Listing</h1>
          <h2 id="spotlist__nospot">You haven't created a listing on FairBnB yet!</h2>
        </div>
      );
    }

    return (
        <>
          <div id ='userspot-container'>
          <h1 id="userspot-listing"> Listing</h1>
        {spots.map((spot) => (
      <div key={spot.id} id='userspot__ind-container'>
              {/* <div id='userspotimg__container'>
                <img
                  id="userspotimg"
                  alt=''
                  src={spot.previewImage}
                />
              </div> */}

              <Link id="userspotimg__container" to={`/spots/${spot.id}`}>
              <img
                  id="userspotimg"
                  alt=''
                  src={spot.previewImage}
                />
              </Link>

        <div id="userspot__rightcontainer" >

                    <div id="userspot__textline1">{spot.city}</div>
                    <div className="userspot__container1">{spot.name}</div>
                    <div className="userspot__container1">{spot.description}</div>
                    <div className="userspot__container1">${spot.price} night</div>


                    {/* <button > */}
                      <Link id="userspoteditbtn" to={`/spots/${spot.id}/edit`}>
                      Edit
                      </Link>
                    {/* </button> */}

                      <button className="userspotbtn" onClick={() => dispatch(spotActions.deleteSpot(spot.id))}>
                      Delete
                      </button>


          </div>
      </div>

        ))}
        </div>
        </>
    );
  };

  export default UserSpots;
