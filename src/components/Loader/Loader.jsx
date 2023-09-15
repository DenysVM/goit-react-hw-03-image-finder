import React, { Component } from "react";
import { RotatingLines } from 'react-loader-spinner'
import styles from "./Loader.module.css"

class CustomLoader extends Component {
  render() {
    return (
      <div className={styles.loader_container}>
        <RotatingLines
        strokeColor="grey"
        strokeWidth="5"
        animationDuration="0.75"
        width="100"
        visible={true}/>
      </div>
    );
  }
}

export default CustomLoader;
