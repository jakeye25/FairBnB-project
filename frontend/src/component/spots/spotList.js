import React from 'react';
import { NavLink, Route, useParams } from 'react-router-dom';
import {useEffect, useState} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getSpots } from '../../store/spot';
import './spot.css';

const SpotsBrowser = () => {

  const spotsObj = useSelector((state) => state.spot)

  const allspots = Object.values(spotsObj)

  const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getSpots());
    },[dispatch])

    if(!allspots.length) {
      return null
    }
return (
    <>
      <div className ='wrapper'>
        <div className='card'>
       {allspots && allspots.map((spot) => (
          <NavLink key={spot.id} to={`/spots/${spot.id}`}>
          <div>
            <img
              className="card__image"
              alt={spot.previewImage}
              src={spot.previewImage}
            />
            </div>
            <div className='card__name'>{spot.city},{spot.state}</div>
            {/* <div className="card_des">{spot.state}</div> */}
            <div className="card__price">${spot.price} night</div>
          </NavLink>
            ))}
        </div>
    </div>
  </>
  );
};
export default SpotsBrowser;



{//   return (
  //     <div className="spot-container">
  //         <ul>
  //             {allspots && allspots.map((spot) => {
  //                 return <li className="eachspot" key={spot.id}>
  //                     <NavLink to={`/spots/${spot.id}`}>{spot.name}</NavLink>
  //                 </li>
  //             })}

  //         </ul>
  //     </div>
  // )
};
{/* {showForm ? ( */}
       {/* <SpotCreateFormPage hideForm={() => setShowForm(false)} /> */}
       {/* <SpotEditFormPage hideForm={() => setShowForm(false)} /> */}

     {/* ) : (
  //     // <Route path="/pokemon/:pokemonId">
  //     //   {/* <PokemonDetail/> */}
       {/* // </Route> */}
     {/* ) */}
    {/* } */}

                  {/* <div
                className="nav-entry-image"
                style={{ backgroundImage: `url('${spot.previewImage}')` }}
              ></div>
              <div>
                <div className="primary-text">{spot.name}</div>
                <div className="secondary-text">
                  {spot.price}</div>
                  <div className="third-text">
                  {spot.description}
                  </div> */}
