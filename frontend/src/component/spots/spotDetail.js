import React from 'react';
import { Link } from 'react-router-dom';
// import { removeSpot } from '../../store/spot';
import { getspots } from '../../store/spot';
import { useDispatch } from 'react-redux';

const SpotDetail = ({ spots }) => {
  const dispatch = useDispatch();
  const deleteSpot = (e) => {
    e.preventDefault();
    dispatch(getspots())
  };

  return (
    <div>

      {/* <Link to={`/api/spots/${spot.id}`}>Spot#{spot.id}</Link> */}
{/* //       <Link to={`/books/${book.id}/edit`}>Edit</Link> */}
      <button onClick={deleteSpot}>Delete</button>
    </div>
  );
};

export default SpotDetail;
