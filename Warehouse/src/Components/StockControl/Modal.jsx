import React from "react";

import styles from "./Modal.module.css";
import { ReactComponent as Close } from "../../assets/removeicon.svg";

const Modal = ({ setActiveModal, activeModal, children }) => {
  function handleModal(event) {
    if (event.currentTarget === event.target) {
      setActiveModal(false);
    }
  }

  function closeModal() {
    setActiveModal(false);
  }

  if (!activeModal) return null;
  return (
    <div className={styles.modalContainer} onClick={handleModal}>
      <div className={styles.modalBox}>
        <button className={styles.closeModalBtn} onClick={closeModal}>
          <Close />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
