import axios from 'axios';

const API_URL = process.env.API_ENDPOINT || 8081;

export const api_service = {
    getItems: () => axios.get(`${API_URL}`),
    createIteam: (data) => axios.post(`${API_URL}`, data),
};