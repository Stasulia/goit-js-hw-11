import axios from 'axios';

const API_KEY = '40276984-935978e538943939b41c3d22f';
const BASE_URL = 'https://pixabay.com/api/';

async function fetchImages(query, page, perPage) {
  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page,
    per_page: perPage,
  });

  return await axios.get(`${BASE_URL}?${params}`).then(response => {
    if (response.status !== 200) {
      throw new Error(`Error: ${response.status}`);
    }
    return response.data;
  });
}

export { fetchImages };
