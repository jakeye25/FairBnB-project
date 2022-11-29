import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';

import BookingDelete from './bookingDelete';

import './bookingDelete.css'


function BookingDeleteFormModal({booking}) {
    const [showModal, setShowModal] = useState(false);

    return (
      <>
         <div id='delansbtn' onClick={() => setShowModal(true)}><i class="fa-regular fa-trash-can"></i>&nbsp;Delete </div>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>

            <BookingDelete booking={booking} setShowModal={setShowModal}/>
          </Modal>
        )}
      </>
    );
  }

  export default BookingDeleteFormModal;
