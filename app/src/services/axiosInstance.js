import axios from "axios";

const baseURL = process.env.VUE_APP_SERVER_URL;

const axiosInstance = axios.create ({
    baseURL, 
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});


export default axiosInstance;