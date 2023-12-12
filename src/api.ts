import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { getToken } from './local-storage.ts/userData';
const BACKEND_URL = 'https://14.design.pages.academy/six-cities';
const REQUEST_TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    //записываем в переменную token, сохранённый в хранилище (если он есть)
    const token = getToken();
    //если токен есть, то записываем его в свойство x-token свойства конфигцурации запроса headers
    if (token) {
      config.headers['x-token'] = token;
    }
    return config;
  });

  return api;
};
