import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/movie",
  params: {
    api_key: import.meta.env.VITE_REACT_APP_API_KEY,
  },
});
export const api1 = axios.create({
  baseURL: "https://api.themoviedb.org/3/genre/movie",
  params: {
    api_key: import.meta.env.VITE_REACT_APP_API_KEY,
  },
});
