import axios from "axios";

export const BACKEND_URL="http://localhost:6500";

export const axiosInstance = axios.create({
    baseURL:BACKEND_URL,
    withCredentials:true
});
