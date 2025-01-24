import axios from "axios";

const API = axios.create({
  // baseURL: "http://localhost:5000/api",
  baseURL: "https://notes-server-f5ot.onrender.com/api",
});

export default API;
