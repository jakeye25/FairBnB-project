import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';

import BookingEdit from './bookingEdit';

import './bookingEdit.css'


function BookingEditFormModal({booking}) {
    const [showModal, setShowModal] = useState(false);

    return (
      <>
         <div id='delansbtn' onClick={() => setShowModal(true)}><i class="fa-regular fa-pen-to-square"></i>&nbsp; Edit </div>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>

            <BookingEdit booking={booking} setShowModal={setShowModal}/>
          </Modal>
        )}
      </>
    );
  }

  export default BookingEditFormModal;
