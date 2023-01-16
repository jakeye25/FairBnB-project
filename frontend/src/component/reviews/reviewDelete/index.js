import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';

import ReviewDelete from './reviewDelete';

import './reviewDelete.css'


function ReviewDeleteFormModal({review}) {
    const [showModal, setShowModal] = useState(false);

    return (
      <>
         <div className="review_del_btn" onClick={() => setShowModal(true)}>Delete </div>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>

            <ReviewDelete review={review} setShowModal={setShowModal}/>
          </Modal>
        )}
      </>
    );
  }

  export default ReviewDeleteFormModal;
