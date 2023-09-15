import React, { Component } from "react";
import styles from "./Modal.module.css";

class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
    document.body.style.overflow = "hidden";
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
    document.body.style.overflow = "auto"; 
  }

  handleKeyDown = (event) => {
    if (event.code === "Escape") {
      this.props.onClose();
    }
  };

  render() {
    const { image, onClose } = this.props;

    return (
      <div className={styles.overlay} onClick={onClose}>
        <div className={styles.modal}>
          <img src={image} alt="" />
        </div>
      </div>
    );
  }
}

export default Modal;
