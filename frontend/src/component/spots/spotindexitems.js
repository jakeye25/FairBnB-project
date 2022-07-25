import React from 'react';
import { Link } from 'react-router-dom';
import { getspots, getspotDetail } from '../../store/spot';
import { useDispatch } from 'react-redux';

const SpotIndexItem = ({ spot }) => {
  const dispatch = useDispatch();
//   const deleteBook = (e) => {
//     e.preventDefault();
//     dispatch(removeBooks(book.id))
//   };

    dispatch(getspots(spot));
    // dispatch(getspotDetail({spot.id}))

  return (<li></li>
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
