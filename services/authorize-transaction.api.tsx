import axios from "axios";

const authorizeApi = axios.create({
  baseURL: import.meta.env.REACT_AUTHORIZE_TRANSACTION_API_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
  crossDomain: true,
});

authorizeApi.interceptors.request.use(async (config) => {
  // const token =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZFVzdWFyaW8iOiIxIiwiTm9tZSI6IlVzdcOhcmlvIGRlIFRlc3RlIiwiQ29udGFzIjoibnVsbCIsIm5iZiI6MTY0NDgwOTg5OCwiZXhwIjoxNjQ1NTAxMDk4LCJpYXQiOjE2NDQ4MDk4OTgsImlzcyI6ImxvY2FsaG9zdCIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjQ0MzcyLyJ9.i6p-Qk7tB9zqAbw9TVQ4HN1Fmv4fxM9qvM6r8t6ph9I";
  const token = recoverToken();
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

authorizeApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error?.response?.status === 401 &&
      error?.response?.data?.complemento?.codigo === "002"
    ) {
      // const canRedirect = logout();
      // if (canRedirect) {
      window.location = "/app";
      //}
    } else {
      return Promise.reject(error);
    }
  }
);

const recoverToken = () => {
  const token = localStorage.getItem("x_access_token");

  if (token) {
    const parsed = JSON.parse(token);
    return "bearer " + parsed.access_token;
  }
  return null;
};

export default authorizeApi;
