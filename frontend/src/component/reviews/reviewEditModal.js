import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import ReviewEditFormPage from "./reviewEdit";

function ReviewEditModal({review}) {
    const [showModal, setShowModal] = useState(false);


    return (
      <>
        <button className="update_review_modal_button" onClick={() => setShowModal(true)}>
          Edit
        </button>

        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
              <ReviewEditFormPage setShowModal={setShowModal} review={review} />
          </Modal>
        )}
      </>
    );
  }

  export default ReviewEditModal;
