import axios from "axios";

export const BACKEND_URL="https://chatspot-app.onrender.com";

export const axiosInstance = axios.create({
    baseURL:BACKEND_URL,
    withCredentials:true
});
