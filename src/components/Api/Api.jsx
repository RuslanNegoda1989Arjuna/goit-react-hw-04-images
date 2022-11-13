import axios from 'axios';
const API_KEY = '30077123-b07f3bce85b956a1421c5c012';
const BASE_URL = 'https://pixabay.com/api/';

export default async function fetchPictures(search, page) {
  const config = {
    method: 'get',
    url: BASE_URL,
    params: {
      key: API_KEY,
      q: `${search}`,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 12,
      page: `${page}`,
    },
  };

  const response = await axios(config);

  const data = response.data;
  return data;
}
