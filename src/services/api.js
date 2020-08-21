import axios from "axios";

const api = axios.create({
//  baseURL: "http://localhost:3333",
  baseURL: "http://192.168.15.8:3333",
});

export default api;
