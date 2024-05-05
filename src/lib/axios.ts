import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_NEWS_API_END_POINT,
  params: {
    apiKey: process.env.NEXT_PUBLIC_NEWS_API_KEY,
  },
});
