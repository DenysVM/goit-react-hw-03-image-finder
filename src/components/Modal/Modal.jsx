import React, { useEffect, useState } from "react";
import styles from "./Modal.module.css";

function Modal({ image, onClose }) {
  const [isModalOpen, setIsModalOpen] = useState(true);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Escape") {
        onClose();
      }
    };

    if (isModalOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen, onClose]);

  const closeModal = () => {
    setIsModalOpen(false);
    onClose();
  };

  return (
    isModalOpen && (
      <div className={styles.overlay} onClick={closeModal}>
        <div className={styles.modal}>
          <img src={image} alt="" />
        </div>
      </div>
    )
  );
}

export default Modal;
