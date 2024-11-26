import axios from 'axios';

const API_URL = process.env.PORT || 8080;

export const api_service = {
    getItems: () => axios.get(`${API_URL}/items`),
    createIteam: (data) => axios.post(`${API_URL}/items`, data),
};