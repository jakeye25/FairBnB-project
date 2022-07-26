import React from 'react';
import { NavLink } from 'react-router-dom';
import {useEffect} from 'react'
import { getspots } from '../../store/spot';
import { useDispatch, useSelector } from "react-redux";


function SpotsList () {
  const dispatch = useDispatch();

      useEffect(() => {
        dispatch(getspots());
      },[dispatch])

    const allspots = useSelector(state => Object.values(state.spot))
    // console.log(state.spot)
    return (
      <div className="spot-container">
          <ul>
              {allspots && allspots.map((spot) => {
                  return <li className="eachspot" key={spot.id}>
                      <NavLink to={`/spots/${spot.id}`}>{spot.name}</NavLink>
                  </li>
              })}

          </ul>
      </div>
  )
}
export default SpotsList;
