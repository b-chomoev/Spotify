import axios from 'axios';
import { apiUrl } from './globalConstants';

const axiosAPI = axios.create({
  baseURL: apiUrl,
});

export default axiosAPI;