import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Searchbar.module.css";

class Searchbar extends Component {
  state = {
    inputQuery: "", 
  };

  handleSubmit = async (event) => {
    
    event.preventDefault();
    if (this.state.inputQuery.trim() === "") {
      toast.error("Please enter a search query.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    try {
       this.props.onSubmit(this.state.inputQuery); 
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while searching. Please try again later.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  handleInputChange = (event) => {
    this.setState({ inputQuery: event.target.value });
  };

  render() {
    return (
      <header className={styles.searchbar}>
        <form className="form" onSubmit={this.handleSubmit}>
          <input
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.inputQuery}
            onChange={this.handleInputChange}
          />

          <button type="submit" className="button">
            <span>Search</span>
          </button>
        </form>

        <ToastContainer />
      </header>
    );
  }
}

export default Searchbar;
