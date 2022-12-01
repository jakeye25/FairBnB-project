import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';

import BookingEdit from './bookingEdit';

import './bookingEdit.css'


function BookingEditFormModal({booking}) {
    const [showModal, setShowModal] = useState(false);

    return (
      <>
         <div className='userbookingbtn' onClick={() => setShowModal(true)}>Edit </div>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>

            <BookingEdit booking={booking} setShowModal={setShowModal}/>
          </Modal>
        )}
      </>
    );
  }

  export default BookingEditFormModal;
