import axios from "axios";

export const movieApi = axios.create({
  baseURL: "https://api.themoviedb.org/3/movie",
  params: {
    api_key: import.meta.env.VITE_REACT_APP_API_KEY,
  },
});
export const genreApi = axios.create({
  baseURL: "https://api.themoviedb.org/3/genre/movie",
  params: {
    api_key: import.meta.env.VITE_REACT_APP_API_KEY,
  },
});
export const searchApi = axios.create({
  baseURL: "https://api.themoviedb.org/3/search",
  params: {
    api_key: import.meta.env.VITE_REACT_APP_API_KEY,
  },
});
