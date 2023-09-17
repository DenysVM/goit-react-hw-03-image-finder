  import React, { Component } from "react";
  import fetchImages from "../services/Api/Api";
  import Searchbar from "../components/Searchbar/Searchbar";
  import ImageGallery from "../components/ImageGallery/ImageGallery";
  import Button from "../components/Button/Button";
  import Modal from "../components/Modal/Modal";
  import CustomLoader from "../components/Loader/Loader";
  import { toast } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";

  class App extends Component {
    state = {
      query: "", 
      page: 1,
      images: [],
      selectedImage: null,
      isLoading: false,
      btnLoadMore: false,
    };

    handleQueryChange = (event) => {
      this.setState({ query: event.target.value });
          };

    handleSearch = async () => {

      this.setState({ page: 1, images: [], isLoading: true });

      try {
        await this.fetchImagesData();
      } catch (error) {
        console.error("Error:", error);
        this.setState({ isLoading: false });
        throw error; 
      }
    };

    handleImageClick = (imageUrl) => {
      this.setState({ selectedImage: imageUrl });
    };

    handleCloseModal = () => {
      this.setState({ selectedImage: null });
    };

  fetchImagesData = async () => {
    if (!this.state.query) return;

    this.setState({ isLoading: true });

    try {
      const newImages = await fetchImages(
        this.state.query,
        this.state.page
      );

      if (newImages.length === 0) {
        toast.error("No images found for your search.", {
          position: "top-right",
          autoClose: 3000,
        });
      } else {
        
        this.setState((prevState) => ({
          images: [...prevState.images, ...newImages],
          btnLoadMore: newImages.length >= 12, 
        }));
      }
    } catch (error) {
      toast.error("An error occurred while searching. Please try again later.", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      this.setState({ isLoading: false });
    }
  };

    handleLoadMore = () => {
    this.setState(
      (prevState) => ({ page: prevState.page + 1, isLoading: true }),
      () => {
        this.fetchImagesData();
      }
    );
  };

    render() {
      return (
        <div>
          <Searchbar
            query={this.state.query}
            onQueryChange={this.handleQueryChange}
            onSubmit={this.handleSearch}
          />
          <ImageGallery
            images={this.state.images}
            onImageClick={this.handleImageClick}
          />
          {this.state.images.length  !== 0 && this.state.btnLoadMore && (
            <Button onClick={this.handleLoadMore} />
          )}
          {this.state.isLoading && <CustomLoader />}
          {this.state.selectedImage && (
            <Modal
              image={this.state.selectedImage}
              onClose={this.handleCloseModal}
            />
          )}
        </div>
      );
    }
  }

  export default App;