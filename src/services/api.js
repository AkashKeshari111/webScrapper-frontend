import axios from "axios";

const API = axios.create({
  baseURL: `https://webscrapper-57rm.onrender.com/api`,
  withCredentials: true,
});

export default API;
