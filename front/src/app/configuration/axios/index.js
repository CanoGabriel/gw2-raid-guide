import axios from "axios";
import { getAuthToken } from "../auth";

const { REACT_APP_API_URL } = process.env;

const defaultAxiosInstanceOptions = {
  baseURL: REACT_APP_API_URL,
  timeout: 30000,
  validateStatus: (status) => status < 400,
};

/**
 * Default axios instance
 * @type {AxiosInstance}
 */
const http = axios.create(defaultAxiosInstanceOptions);

http.interceptors.request.use((reqConfig) => {
  const token = getAuthToken();
  if (token) {
    // eslint-disable-next-line no-param-reassign
    reqConfig.headers.Authorization = `Bearer ${token}`;
  }
  return reqConfig;
});

export default http;
