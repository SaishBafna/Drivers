import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
//@ts-ignore
import {API_URL,API_IMAGE_URL} from '@env';

// const API_URL = process.env.API_URL;

// Create an Axios instance
const apiClient = axios.create({
  baseURL: `${API_URL}`, // Base URL for the API
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json', // Default content type
  },
});


const handleLoginSuccess = async (responseData: {
  _id: string;
  token: string;
  refreshToken: string;
}) => {
  try {
    await AsyncStorage.setItem('authToken', responseData.token);
    await AsyncStorage.setItem('user_id', responseData._id);
    await AsyncStorage.setItem('refreshToken', responseData.refreshToken);
    console.log('Tokens stored successfully');
  } catch (error) {
    console.error('Error storing tokens:', error);
  }
};
// Request Interceptor to add Bearer Token
apiClient.interceptors.request.use(
  async (config) => {
    try {
      // Get the token from AsyncStorage
      const token = await AsyncStorage.getItem('authToken');

      // If the token exists, add it to the Authorization header
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    } catch (error) {
      //@ts-ignore
      console.error('Axios error:', error.response?.data || error.message);
    return Promise.reject(error);
    }
  }
);

export default apiClient;
