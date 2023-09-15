import axios from "axios";

const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "38624994-74d2e2de4f88bee78c9a8eed4";

const fetchImages = async (query, page) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        page,
        per_page: 12,
        image_type: "photo",
        orientation: "horizontal",
      },
    });
    return response.data.hits;
  } catch (error) {
    throw error;
  }
};

export default fetchImages;
