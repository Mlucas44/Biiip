// axiosConfig.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { VITE_BACKEND_URL } from '@env';

const instance = axios.create({
  baseURL: VITE_BACKEND_URL,
});

// Intercepteur de requête
instance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Erreur de requête :', error);
    return Promise.reject(error);
  }
);

// Intercepteur de réponse
instance.interceptors.response.use(
  (response) => {
    // Log de la réponse
    console.log('Axios à bien reçu la requête');
    return response;
  },
  (error) => {
    console.error('Erreur de réponse :', error);
    return Promise.reject(error);
  }
);

export default instance;
