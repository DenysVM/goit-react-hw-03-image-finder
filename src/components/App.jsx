import React, { useState, useEffect } from "react";
import fetchImages from "../services/Api/Api";
import Searchbar from "../components/Searchbar/Searchbar";
import ImageGallery from "../components/ImageGallery/ImageGallery";
import Button from "../components/Button/Button";
import Modal from "../components/Modal/Modal";
import CustomLoader from "../components/Loader/Loader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [btnLoadMore, setBtnLoadMore] = useState(false);

  const handleQueryChange = (query) => {
    setQuery(query);
  };

  const handleSearch = (query) => {
    setPage(1);
    setImages([]);
    setIsLoading(true);
    setQuery(query);
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const handleLoadMore = () => {
    setPage(page + 1);
    setIsLoading(true);
  };

  useEffect(() => {
    if (!query) return;

    setIsLoading(true);

    try {
      fetchImages(query, page)
        .then((newImages) => {
          if (newImages.length === 0) {
            toast.error("No images found for your search.", {
              position: "top-right",
              autoClose: 3000,
            });
          } else {
            setImages((prevImages) => [...prevImages, ...newImages]);
            setBtnLoadMore(newImages.length >= 12);
          }
        })
        .catch((error) => {
          toast.error("An error occurred while searching. Please try again later.", {
            position: "top-right",
            autoClose: 3000,
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false);
      throw error;
    }
  }, [query, page]);

  return (
    <div>
      <Searchbar
        query={query}
        onQueryChange={handleQueryChange}
        onSubmit={handleSearch}
      />
      <ImageGallery
        images={images}
        onImageClick={handleImageClick}
      />
      {images.length !== 0 && btnLoadMore && (
        <Button onClick={handleLoadMore} />
      )}
      {isLoading && <CustomLoader />}
      {selectedImage && (
        <Modal
          image={selectedImage}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

export default App;
