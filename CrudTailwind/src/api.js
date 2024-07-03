// src/api.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/pessoas', // ou o endereço correto do seu servidor
  headers: {
    'Content-Type': 'application/json'
  }
});

export default apiClient;
