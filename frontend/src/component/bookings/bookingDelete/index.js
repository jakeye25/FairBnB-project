import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';

import BookingDelete from './bookingDelete';

import './bookingDelete.css'


function BookingDeleteFormModal({booking}) {
    const [showModal, setShowModal] = useState(false);

    return (
      <>
         <div className='userbookingbtn' onClick={() => setShowModal(true)}>Delete </div>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>

            <BookingDelete booking={booking} setShowModal={setShowModal}/>
          </Modal>
        )}
      </>
    );
  }

  export default BookingDeleteFormModal;
