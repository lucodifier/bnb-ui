import axios from "axios";
import { storageService } from "./storage.service";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(async (config: any) => {
  if (config.url.toLowerCase() !== "autenticacao" || config.url.toLowerCase().includes('refreshtokensso')) {
    const token = recoverToken();
    if (token) {
      config.headers.Authorization = token;
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (response) => {
    if (
      response?.response?.status === 422 ||
      response?.response?.status === 201 ||
      response?.response?.status === 400
    ) {
      return response;
    }

    if (
      response?.response?.status === 401 &&
      response?.response?.data?.complemento?.codigo === "002"
    ) {
      // const canRedirect = logout();
      // if (canRedirect) {
      window.location.href = "/app";
      //}
    } else {
      return Promise.reject(response);
    }
  }
);

const recoverToken = () => {
  const token = localStorage.getItem("x_access_token");

  if (token) {
    const parsed = JSON.parse(token);
    return "bearer " + parsed.accessToken;
  }
  return null;
};

export default api;
