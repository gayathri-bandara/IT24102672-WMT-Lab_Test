import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5001/api"
});

// Add response interceptor for better error handling
API.interceptors.response.use(
  response => response,
  error => {
    console.error("API Error:", {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    return Promise.reject(error);
  }
);

export default API;

export const getItems = () => API.get("/items");
export const getItemById = (id) => API.get(`/items/${id}`);
export const createItem = (data) => API.post("/items", data);
export const updateItem = (id, data) => API.put(`/items/${id}`, data);
export const deleteItem = (id) => API.delete(`/items/${id}`);