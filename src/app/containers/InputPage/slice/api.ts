import axios from 'axios';

export const getSuggestions = (query: string) =>
  axios.get(`http://localhost:3000/suggest?q=${query}`);
