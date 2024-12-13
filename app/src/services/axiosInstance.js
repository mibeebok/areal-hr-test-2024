import axios from "axios";
const baseUPL = process.env.VUE_APP_SERVER_URL;
const axiosInstance = axios.create ({
    baseURL, 
    timeout: 10000,
    headers: {
        'Content-Type': 'applocation/json',
    },
});
http.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

export default axiosInstance;