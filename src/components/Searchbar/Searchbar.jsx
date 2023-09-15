import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Searchbar.module.css";

class Searchbar extends Component {
  handleSubmit = async (event) => {
    event.preventDefault();

    if (this.props.query.trim() === "") {
      toast.error("Please enter a search query.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    try {
      await this.props.onSubmit();
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while searching. Please try again later.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
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
            value={this.props.query}
            onChange={this.props.onQueryChange} 
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
