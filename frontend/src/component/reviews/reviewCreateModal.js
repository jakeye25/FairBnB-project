
import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import ReviewCreateFormPage from './reviewCreate';

function ReviewCreateModal({reviewId}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Create Review</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ReviewCreateFormPage reviewId={reviewId} onClose={()=> setShowModal(false)} />
        </Modal>
      )}
    </>
  );
}

export default ReviewCreateModal;
