import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';

import SpotDelete from './spotDelete';

import './spotDelete.css'


function SpotDeleteFormModal({spot}) {
    const [showModal, setShowModal] = useState(false);

    return (
      <>
         <div className="spot_del_btn" onClick={() => setShowModal(true)}>Delete </div>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>

            <SpotDelete spot={spot} setShowModal={setShowModal}/>
          </Modal>
        )}
      </>
    );
  }

  export default SpotDeleteFormModal;
