import React, { Component } from "react";
import styles from "./ImageGalleryItem.module.css";

class ImageGalleryItem extends Component {
  handleClick = () => {
    this.props.onImageClick(this.props.image.largeImageURL);
  };

  render() {
    const { image } = this.props;
    return (
      <li className={styles.gallery_item} onClick={this.handleClick}>
        <img src={image.webformatURL} alt={image.tags} />
      </li>
    );
  }
}

export default ImageGalleryItem;
