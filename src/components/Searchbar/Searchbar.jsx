import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Searchbar.module.css";

function Searchbar({ onSubmit }) {
  const [inputQuery, setInputQuery] = useState(""); 

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (inputQuery.trim() === "") {
      toast.error("Please enter a search query.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    try {
      onSubmit(inputQuery);
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while searching. Please try again later.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handleInputChange = (event) => {
    setInputQuery(event.target.value);
  };

  return (
    <header className={styles.searchbar}>
      <form className="form" onSubmit={handleSubmit}>
        <input
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={inputQuery}
          onChange={handleInputChange}
        />

        <button type="submit" className="button">
          <span>Search</span>
        </button>
      </form>

      <ToastContainer />
    </header>
  );
}

export default Searchbar;
