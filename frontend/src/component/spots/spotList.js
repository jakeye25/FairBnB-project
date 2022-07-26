import React from 'react';
import { Link } from 'react-router-dom';
import {useEffect} from 'react'
import { getspots } from '../../store/spot';
import { useDispatch } from 'react-redux';

const SpotIndexItem = ({ spot }) => {
  const dispatch = useDispatch();
//   const deleteBook = (e) => {
//     e.preventDefault();
//     dispatch(removeBooks(book.id))
//   };

useEffect(() => {
  dispatch(getspots());
},[dispatch])
    // dispatch(getspotDetail({spot.id}))

  return (<h1>spot component</h1>
    // <section>
    //   <ul>
    //     {
    //       spot.map(spot => (
    //         <BookIndexItem
    //           book={book}
    //           key={book.id}
    //         />
    //       ))
    //     }
    //   </ul>
    //   </section>
  );
};

export default SpotIndexItem;
