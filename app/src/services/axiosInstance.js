import axios from "axios";

const baseURL = process.env.API_ENDPOINT || `http://localhost:8081`

const axiosInstance = axios.create ({
    baseURL, 
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});


export default axiosInstance;