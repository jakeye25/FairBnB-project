import React from 'react';
import { NavLink, Route, useParams } from 'react-router-dom';
import {useEffect, useState} from 'react'
import { getSpots } from '../../store/spot';
import { useDispatch, useSelector } from "react-redux";
import Fab from './Fab';

const SpotsBrowser = () => {
  const dispatch = useDispatch();
  const {spotId} = useParams()
  // const allspots = useSelector(state => {
    // console.log(state)
  //   return state.spots.list.map(spotId=> state.spot[spotId])
  // })
  const [showForm, setShowForm] = useState(false);
    useEffect(() => {
      dispatch(getSpots());
    },[dispatch])

    const allspots = useSelector(state => Object.values(state.spot))
    // console.log(state.spot)

    if(!allspots) {
      return null
    }
return (
    <main>
    <nav>
      <Fab hidden={showForm} onClick={() => setShowForm(true)} />
      {allspots.map((spot) => {
        return (
          <NavLink key={spot.name} to={`/spots/${spot.id}`}>
            <div
              className={
                Number.parseInt(spotId) === spot.id
                  ? "nav-entry is-selected"
                  : "nav-entry"
              }
            >
              <div
                className="nav-entry-image"
                style={{ backgroundImage: `url('${spot.url}')` }}
              ></div>
              <div>
                <div className="primary-text">{spot.name}</div>
                <div className="secondary-text">
                  {spot.price}
                  <div className="third-text">
                  {spot.description}
                  {/* {pokemon.captured && "(Captured)"} */}
                  </div>
                </div>
              </div>
            </div>
          </NavLink>
        );
      })}
    </nav>
     {/* {showForm ? (
      <CreatePokemonForm hideForm={() => setShowForm(false)} />
    ) : (
      <Route path="/pokemon/:pokemonId">
        <PokemonDetail/>
      </Route>
    )}} */}
  </main>
);
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
}
export default SpotsBrowser;
