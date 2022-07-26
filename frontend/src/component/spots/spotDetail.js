import React from 'react';
import { Link } from 'react-router-dom';
import { removeSpot } from '../../store/spot';
import { useDispatch } from 'react-redux';

const spotDetail = ({ spot }) => {
  const dispatch = useDispatch();
  const deleteSpot = (e) => {
    e.preventDefault();
    dispatch(removeSpot(spot.id))
  };

  return (
    <li>
{/* //       <Link to={`/books/${book.id}`}>Book #{book.id}</Link>
//       <Link to={`/books/${book.id}/edit`}>Edit</Link> */}
      <button onClick={deleteSpot}>Delete</button>
//     </li>
  );
};

export default spotDetail;
