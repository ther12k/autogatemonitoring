import axios from "axios";

// Create an Axios instance with a base URL from environment variables
const api = axios.create({
    baseURL: import.meta.env.VITE_REACT_APP_API_URL || "http://api.pmms.halotec.my.id/api", // Fallback URL
});

// Add a request interceptor to include the token in the headers if it exists
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Optionally, you can add a response interceptor for error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle errors globally if needed
        console.error("API Error:", error.response ? error.response.data : error.message);
        return Promise.reject(error);
    }
);

export default api;
