import axios from "axios";

//Todo API_ENDPOINT не подтягивается из .env файла из корня проекта. Разберись почему и исправь

const baseURL = process.env.API_ENDPOINT || `http://localhost:8081`

const axiosInstance = axios.create ({
    baseURL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});


export default axiosInstance;
